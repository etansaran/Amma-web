// PM2 process file for the VPS. Started by deploy/deploy.sh:
//   pm2 startOrReload /var/www/thiyaneswaramma/current/deploy/ecosystem.config.cjs --update-env
//
// `cwd` goes through the `current` symlink on purpose: every restart re-resolves
// it, so a reload always runs the newest release.
const APP_DIR = process.env.APP_DIR || "/var/www/thiyaneswaramma";

module.exports = {
  apps: [
    {
      name: "thiyaneswaramma",
      cwd: `${APP_DIR}/current/.next/standalone`,
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "600M",
      kill_timeout: 8000,
      env: {
        NODE_ENV: "production",
        // Only Nginx talks to the app; it is never exposed directly.
        HOSTNAME: "127.0.0.1",
        PORT: process.env.APP_PORT || "3100",
      },
      out_file: "/var/log/thiyaneswaramma/out.log",
      error_file: "/var/log/thiyaneswaramma/error.log",
      time: true,
    },
  ],
};
