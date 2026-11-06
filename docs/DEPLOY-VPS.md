# Deploying to the Hostinger VPS

Server: Hostinger VPS `srv2005243` (157.173.219.250), Ubuntu 24.04. The same server also runs the ConvertFunnel / DermaCare apps; this site is added alongside them and never touches them.

How it runs, following the server's existing pattern:

- **Caddy** (already on the server) serves `thiyaneswaramma.org` over HTTPS and gets/renews certificates automatically. `www` redirects to the bare domain.
- **systemd service** `thiyaneswaramma` runs the Next.js standalone server on `127.0.0.1:3100` as its own system user, capped at 800 MB of memory.
- **Releases** live in `/opt/thiyaneswaramma/releases/<timestamp>`; `/opt/thiyaneswaramma/current` points at the live one. Each deploy builds a new release, switches only after a health check passes, and rolls back by itself if the new one fails. The last 3 releases are kept.

## DNS (Hostinger hPanel → Domains → thiyaneswaramma.org → DNS records)

| Type | Name | Points to |
|---|---|---|
| A | @ | 157.173.219.250 |
| CNAME | www | thiyaneswaramma.org |

## First-time setup (already done once — keep for reference)

```bash
curl -fsSL https://raw.githubusercontent.com/etansaran/Amma-web/main/deploy/setup-server.sh -o setup-server.sh
sudo bash setup-server.sh                       # user, service, first build
sudo CONFIGURE_CADDY=1 bash setup-server.sh     # add the Caddy site once DNS points here
```

The Caddy step backs up `/etc/caddy/Caddyfile`, appends `deploy/caddy/thiyaneswaramma.org.caddy`, validates it, and reloads Caddy only if valid.

## Updating the site

On the server:

```bash
sudo deploy-thiyaneswaramma
```

Automatically on every push to `main` (optional): GitHub → repo → Settings → Secrets and variables → Actions

- **Variables:** `DEPLOY_ENABLED` = `true`
- **Secrets:** `VPS_HOST` = `157.173.219.250`, `VPS_USER` = `root`, `VPS_SSH_KEY` = a private key whose public key is in `/root/.ssh/authorized_keys`

Create a dedicated key on your computer:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/thiyaneswaramma_deploy -N "" -C "github-deploy"
```

## Useful commands on the server

| Task | Command |
|---|---|
| Status | `systemctl status thiyaneswaramma` |
| Logs | `journalctl -u thiyaneswaramma -f` |
| Restart | `sudo systemctl restart thiyaneswaramma` |
| Roll back | `ls -1dt /opt/thiyaneswaramma/releases/*`, then `sudo ln -sfn <older> /opt/thiyaneswaramma/current && sudo systemctl restart thiyaneswaramma` |
| Caddy check / reload | `caddy validate --config /etc/caddy/Caddyfile && sudo systemctl reload caddy` |
| Access log | `/var/log/caddy/thiyaneswaramma.log` |

## Settings

- Site address: `NEXT_PUBLIC_SITE_URL` defaults to `https://thiyaneswaramma.org`. To override, put it in `/opt/thiyaneswaramma/.env.production` and redeploy.
- Port `3100` is set in `deploy/thiyaneswaramma.service` and `deploy/caddy/thiyaneswaramma.org.caddy` (3000 and 3001 belong to the other apps).
