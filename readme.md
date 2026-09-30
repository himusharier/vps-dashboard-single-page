# Projects & Services Dashboard

A self-hosted control panel — plain HTML / CSS / vanilla JS, served by Nginx in Docker.

## Features
- 🌗 Light / dark theme (persisted in `localStorage`)
- 🔗 Every action button is a real link, opens in a new tab
- 🎨 Animated service cards with status dots (online / warn / down)
- 🧩 Centralized service data — edit `SERVICES` in `js/app.js`
- 📱 Fully responsive

## Structure
```
projects-dashboard/
├── index.html
├── css/style.css
├── js/app.js
├── assets/favicon.svg
├── Dockerfile
├── nginx.conf
├── .dockerignore
├── docker-compose.yml
├── .env.example
└── README.md
```

## Deploy
```bash
cp .env.example .env      # edit HOST_PORT / TZ if you want
docker compose up -d --build
```

Open http://localhost:8080

## Common commands
```bash
docker compose logs -f
docker compose restart
docker compose down
docker compose up -d --build   # rebuild after code changes
```

## Edit your services
Open `js/app.js`, edit the `SERVICES` array:

```js
{
  id: 'portainer',
  name: 'Portainer',
  status: 'online',              // 'online' | 'warn' | 'down'
  meta: 'docker · 12 containers',
  buttons: [
    { label: 'Launch', href: 'https://portainer.example.com', variant: 'primary', icon: 'external' },
    { label: 'Stacks', href: 'https://portainer.example.com/#!/stacks', variant: 'ghost' }
  ]
}
```

Then rebuild:
```bash
docker compose up -d --build
```

## Behind a reverse proxy
Point your proxy at `http://127.0.0.1:8080`. Example Caddyfile:
```
dash.example.com {
    reverse_proxy 127.0.0.1:8080
}
```

## Notes
- `restart: always` — container comes back after reboots/crashes.
- HTML is served with `no-cache`; static assets cache for 30 days.
- No healthcheck — for a static nginx, `restart: always` is enough.