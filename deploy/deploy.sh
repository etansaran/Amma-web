#!/usr/bin/env bash
# Build the latest main branch into a fresh release folder, then switch to it.
# The live site keeps running from the previous release until the new build
# succeeds, so a failed build never takes the site down.
#
#   deploy-thiyaneswaramma            (installed by setup-server.sh)
set -euo pipefail

REPO="${REPO:-https://github.com/etansaran/Amma-web.git}"
BRANCH="${BRANCH:-main}"
APP_DIR="${APP_DIR:-/var/www/thiyaneswaramma}"
KEEP="${KEEP:-3}"

STAMP="$(date +%Y%m%d-%H%M%S)"
RELEASE="$APP_DIR/releases/$STAMP"

echo "==> Fetching $BRANCH into $RELEASE"
mkdir -p "$APP_DIR/releases"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$RELEASE"

# Optional server-side settings (e.g. NEXT_PUBLIC_SITE_URL) live outside releases.
if [[ -f "$APP_DIR/.env.production" ]]; then
  cp "$APP_DIR/.env.production" "$RELEASE/.env.production"
fi

cd "$RELEASE"
echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building"
NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS="--max-old-space-size=1536" npm run build

echo "==> Switching to the new release"
ln -sfn "$RELEASE" "$APP_DIR/current"
pm2 startOrReload "$APP_DIR/current/deploy/ecosystem.config.cjs" --update-env
pm2 save >/dev/null

echo "==> Health check"
for i in {1..20}; do
  if curl -fsS -o /dev/null "http://127.0.0.1:${APP_PORT:-3100}/en"; then
    echo "Site is up."
    break
  fi
  sleep 1
  if [[ $i -eq 20 ]]; then echo "Health check failed — see: pm2 logs thiyaneswaramma"; exit 1; fi
done

echo "==> Removing old releases (keeping $KEEP)"
ls -1dt "$APP_DIR"/releases/* | tail -n +$((KEEP + 1)) | xargs -r rm -rf

echo "Deployed $STAMP"
