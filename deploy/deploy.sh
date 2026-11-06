#!/usr/bin/env bash
# Build the latest main branch into a fresh release folder, then switch to it.
# The live site keeps running from the previous release until the new build
# passes a health check; if the new release fails, it rolls back by itself.
#
#   sudo deploy-thiyaneswaramma          (installed by deploy/setup-server.sh)
set -euo pipefail

REPO="${REPO:-https://github.com/etansaran/Amma-web.git}"
BRANCH="${BRANCH:-main}"
APP_DIR="${APP_DIR:-/opt/thiyaneswaramma}"
APP_USER="${APP_USER:-thiyaneswaramma}"
SERVICE="${SERVICE:-thiyaneswaramma}"
PORT="${PORT:-3100}"
KEEP="${KEEP:-3}"

if [[ $EUID -ne 0 ]]; then echo "Run as root (sudo deploy-thiyaneswaramma)."; exit 1; fi

as_app() { sudo -u "$APP_USER" -H "$@"; }

STAMP="$(date +%Y%m%d-%H%M%S)"
RELEASE="$APP_DIR/releases/$STAMP"
PREVIOUS="$(readlink -f "$APP_DIR/current" 2>/dev/null || true)"

echo "==> Fetching $BRANCH into $RELEASE"
as_app mkdir -p "$APP_DIR/releases"
as_app git clone --quiet --depth 1 --branch "$BRANCH" "$REPO" "$RELEASE"

# Optional server-side settings (e.g. NEXT_PUBLIC_SITE_URL) live outside releases.
if [[ -f "$APP_DIR/.env.production" ]]; then
  install -o "$APP_USER" -g "$APP_USER" -m 640 "$APP_DIR/.env.production" "$RELEASE/.env.production"
fi

cd "$RELEASE"
echo "==> Installing dependencies"
as_app npm ci --no-audit --no-fund --loglevel=error

echo "==> Building (low priority so other apps on this server stay responsive)"
as_app env NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS="--max-old-space-size=1536" nice -n 10 npm run build

echo "==> Switching to the new release"
ln -sfn "$RELEASE" "$APP_DIR/current"
chown -h "$APP_USER:$APP_USER" "$APP_DIR/current"
systemctl restart "$SERVICE"

echo "==> Health check"
ok=0
for _ in $(seq 1 30); do
  if curl -fsS -o /dev/null "http://127.0.0.1:${PORT}/en"; then ok=1; break; fi
  sleep 1
done
if [[ $ok -ne 1 ]]; then
  echo "!! New release failed its health check."
  if [[ -n "$PREVIOUS" && -d "$PREVIOUS" ]]; then
    echo "!! Rolling back to $PREVIOUS"
    ln -sfn "$PREVIOUS" "$APP_DIR/current"
    systemctl restart "$SERVICE"
  fi
  echo "See: journalctl -u $SERVICE -n 100"
  exit 1
fi
echo "Site is up on 127.0.0.1:${PORT}."

echo "==> Removing old releases (keeping $KEEP)"
ls -1dt "$APP_DIR"/releases/* | tail -n +$((KEEP + 1)) | xargs -r rm -rf

echo "Deployed $STAMP"
