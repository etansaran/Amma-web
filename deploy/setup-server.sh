#!/usr/bin/env bash
# One-time setup on the Ubuntu VPS. Safe to re-run.
# Matches the server's existing pattern: each app runs as its own user under
# /opt as a systemd service, and Caddy serves HTTPS in front of it.
# It adds this site only; other apps and Caddy sites are left untouched.
#
#   sudo bash setup-server.sh                 # app + service + first build
#   sudo CONFIGURE_CADDY=1 bash setup-server.sh   # also add the Caddy site (after DNS points here)
set -euo pipefail

DOMAIN="thiyaneswaramma.org"
APP_USER="thiyaneswaramma"
APP_DIR="/opt/thiyaneswaramma"
RAW="https://raw.githubusercontent.com/etansaran/Amma-web/main/deploy"

if [[ $EUID -ne 0 ]]; then echo "Run as root (sudo)."; exit 1; fi

echo "==> Requirements"
command -v git >/dev/null || apt-get install -y git
if ! command -v node >/dev/null || [[ $(node -p 'process.versions.node.split(".")[0]') -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
echo "node $(node -v)"

echo "==> App user and folders"
id "$APP_USER" >/dev/null 2>&1 || useradd --system --create-home --home-dir "$APP_DIR" --shell /usr/sbin/nologin "$APP_USER"
install -d -o "$APP_USER" -g "$APP_USER" -m 755 "$APP_DIR" "$APP_DIR/releases"

echo "==> Deploy command and service"
curl -fsSL "$RAW/deploy.sh" -o /usr/local/bin/deploy-thiyaneswaramma
chmod 755 /usr/local/bin/deploy-thiyaneswaramma
curl -fsSL "$RAW/thiyaneswaramma.service" -o /etc/systemd/system/thiyaneswaramma.service
systemctl daemon-reload
systemctl enable thiyaneswaramma.service >/dev/null

echo "==> First deploy"
/usr/local/bin/deploy-thiyaneswaramma

if [[ "${CONFIGURE_CADDY:-0}" == "1" ]]; then
  echo "==> Caddy site for $DOMAIN"
  CF=/etc/caddy/Caddyfile
  if grep -q "^$DOMAIN {" "$CF"; then
    echo "Caddy already has $DOMAIN — leaving it as is."
  else
    cp -p "$CF" "$CF.bak-thiyaneswaramma-$(date +%Y%m%d%H%M%S)"
    curl -fsSL "$RAW/caddy/$DOMAIN.caddy" >> "$CF"
    # Caddy runs as the `caddy` user; create its log file up front so a
    # root-run validate cannot leave it owned by root (reload would fail).
    install -o caddy -g caddy -m 600 /dev/null /var/log/caddy/thiyaneswaramma.log
    if caddy validate --config "$CF" --adapter caddyfile; then
      chown caddy:caddy /var/log/caddy/thiyaneswaramma.log
      systemctl reload caddy
      echo "Caddy reloaded; HTTPS certificates are issued automatically."
    else
      echo "!! Caddy config invalid — restoring the backup."
      cp -p "$(ls -1t $CF.bak-thiyaneswaramma-* | head -1)" "$CF"
      exit 1
    fi
  fi
fi

echo "Done. Updates from now on:  sudo deploy-thiyaneswaramma"
