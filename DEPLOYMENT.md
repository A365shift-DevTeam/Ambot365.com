# Docker / Portainer Deployment

This stack runs:

- `web`: Nginx serving the built React app on port `8087`
- `api`: ASP.NET Core registration API
- `contact`: Node contact-form API used by the chat email form
- `db`: PostgreSQL with the registration schema initialized on first start

## Portainer Stack

1. In Portainer, create a new stack from this repository.
2. Use `docker-compose.yml` at the repository root.
3. Set these environment variables in the stack:

```env
POSTGRES_PASSWORD=replace-with-a-strong-password
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

4. Deploy the stack.
5. Open the site on:

```text
http://your-server-ip:8087
```

## Reverse Proxy

Point your domain or reverse proxy to the `web` service on container port `80`, or to the host port `8087` from the compose file.

The frontend calls same-origin `/api/...` routes:

- `/api/auth/register` is proxied to the .NET API.
- `/api/contact` is proxied to the Node contact service.

## Database Notes

PostgreSQL data is stored in the named Docker volume `a365shift-postgres-data`.

The SQL files in `Database/init` run only when the database volume is created for the first time. If you already have an existing volume and need to recreate the schema, back up the data first, then remove the volume before redeploying.
