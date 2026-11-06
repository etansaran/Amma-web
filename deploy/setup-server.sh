#!/usr/bin/env bash
# One-time setup for an Ubuntu VPS (Hostinger). Safe to re-run.
# It adds a new Nginx site and a new PM2 app; it never removes or edits
# other sites already on the server.
#
#   sudo bash setup-server.sh
set -euo pipefail

DOMAIN="thiyaneswaramma.org"
APP_DIR="/var/www/thiyaneswaramma"
REPO="https://github.com/etansaran/Amma-web.git"
NODE_MAJOR=22

if [[ $EUID -ne 0 ]]; then echo "Run as root (sudo)."; exit 1; fi

echo "==> Packages"
apt-get update -y
apt-get install -y nginx git curl ca-certificates certbot python3-certbot-nginx

echo "==> Node.js ${NODE_MAJOR} (skipped if a recent Node is already installed)"
if ! command -v node >/dev/null || [[ $(node -p 'process.versions.node.split(".")[0]') -lt 20 ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi
node -v

echo "==> PM2"
command -v pm2 >/dev/null || npm install -g pm2
pm2 startup systemd -u root --hp /root >/dev/null || true

echo "==> Swap (builds need memory on small VPS plans)"
if ! swapon --show | grep -q .; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Folders"
mkdir -p "$APP_DIR/releases" /var/log/thiyaneswaramma

echo "==> Firewall (only if ufw is active)"
if ufw status | grep -q "Status: active"; then
  ufw allow 'Nginx Full'
fi

echo "==> First deploy"
curl -fsSL "https://raw.githubusercontent.com/etansaran/Amma-web/main/deploy/deploy.sh" -o /usr/local/bin/deploy-thiyaneswaramma
chmod +x /usr/local/bin/deploy-thiyaneswaramma
REPO="$REPO" APP_DIR="$APP_DIR" /usr/local/bin/deploy-thiyaneswaramma

echo "==> Nginx site"
cp "$APP_DIR/current/deploy/nginx/${DOMAIN}.conf" "/etc/nginx/sites-available/${DOMAIN}.conf"
ln -sfn "/etc/nginx/sites-available/${DOMAIN}.conf" "/etc/nginx/sites-enabled/${DOMAIN}.conf"
nginx -t
systemctl reload nginx

cat <<MSG

Done. The site runs behind Nginx on port 80.
Next, once the DNS A record for ${DOMAIN} points to this server:

  certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --redirect -m srithiyanesamma@gmail.com --agree-tos -n

Future updates:  deploy-thiyaneswaramma
MSG
