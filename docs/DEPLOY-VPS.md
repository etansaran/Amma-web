# Deploying to the Hostinger VPS

The site runs on your own server: **Nginx** (web server, HTTPS) → **PM2** (keeps the app running) → **Next.js standalone server** on `127.0.0.1:3100`.
Each deploy builds into a new folder and switches over only when the build succeeds, so a failed build never takes the site down.

Works on Ubuntu 22.04 / 24.04 (Hostinger's default VPS images). It adds a new site alongside anything else on the server and does not remove or change other sites.

## 1. Point the domain at the VPS (Hostinger hPanel)

Domains → **thiyaneswaramma.org** → DNS / Nameservers → DNS records:

| Type | Name | Points to | TTL |
|---|---|---|---|
| A | @ | *your VPS IP* | 3600 |
| CNAME | www | thiyaneswaramma.org | 3600 |

Delete Hostinger's default parking `A @`, `AAAA @` and `CNAME www` records first. Keep Hostinger's nameservers.
Your VPS IP is in hPanel → VPS → Overview.

## 2. One-time server setup

Log in to the VPS (hPanel → VPS → Browser terminal, or `ssh root@YOUR_VPS_IP`) and run:

```bash
curl -fsSL https://raw.githubusercontent.com/etansaran/Amma-web/main/deploy/setup-server.sh -o setup-server.sh
sudo bash setup-server.sh
```

This installs Nginx, Node.js 22, PM2 and Certbot, adds 2 GB swap if the server has none, builds the site into `/var/www/thiyaneswaramma`, starts it with PM2 and adds the Nginx site.

## 3. Turn on HTTPS

Once `thiyaneswaramma.org` resolves to the VPS (check with `ping thiyaneswaramma.org`):

```bash
sudo certbot --nginx -d thiyaneswaramma.org -d www.thiyaneswaramma.org --redirect -m srithiyanesamma@gmail.com --agree-tos -n
```

Certificates renew automatically.

## 4. Updating the site

Manual (on the VPS):

```bash
deploy-thiyaneswaramma
```

Automatic on every push to `main` (optional): in GitHub → repo → Settings → Secrets and variables → Actions

- **Variables:** `DEPLOY_ENABLED` = `true`
- **Secrets:** `VPS_HOST` (VPS IP), `VPS_USER` (`root`), `VPS_SSH_KEY` (a private key whose public key is in the server's `~/.ssh/authorized_keys`)

To make a dedicated deploy key, on your computer:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/thiyaneswaramma_deploy -N "" -C "github-deploy"
```

Add the `.pub` file's contents to `/root/.ssh/authorized_keys` on the VPS, and paste the private key file's contents into the `VPS_SSH_KEY` secret.

## Useful commands on the VPS

| Task | Command |
|---|---|
| Status | `pm2 status` |
| Live logs | `pm2 logs thiyaneswaramma` |
| Restart | `pm2 restart thiyaneswaramma` |
| Roll back to the previous build | `ls -1dt /var/www/thiyaneswaramma/releases/*` then `ln -sfn <older folder> /var/www/thiyaneswaramma/current && pm2 restart thiyaneswaramma` |
| Test Nginx config | `nginx -t && systemctl reload nginx` |

## Settings

- Site address: `NEXT_PUBLIC_SITE_URL` defaults to `https://thiyaneswaramma.org`. To override, put it in `/var/www/thiyaneswaramma/.env.production` and redeploy.
- App port: `3100` (change `APP_PORT` in the environment and in `deploy/nginx/thiyaneswaramma.org.conf` together if that port is taken).
