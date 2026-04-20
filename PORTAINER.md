# Portainer Deployment

This stack runs:

- `web`: React production build plus the contact form API
- `api`: ASP.NET Core registration API
- `db`: PostgreSQL with the included `a365shift_db.backup` restored on first start

## Deploy In Portainer

1. Push this repository to the server, or upload it to a location Portainer can build from.
2. In Portainer, go to **Stacks** and create a new stack.
3. Use the repository option, or paste the contents of `docker-compose.yml`.
4. Set these environment variables in Portainer:

```env
PUBLIC_ORIGIN=https://your-domain.com
HOST_WEB_PORT=8080
POSTGRES_DB=a365shift_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=change-this-password
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password
```

5. Deploy the stack.
6. Open the website on port `8080`, or point your reverse proxy/domain to `http://127.0.0.1:8080`.

## Nginx Reverse Proxy

If Nginx is installed directly on the Ubuntu server, proxy to:

```text
http://127.0.0.1:8080
```

Use these important settings:

```nginx
location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 120s;
    proxy_connect_timeout 30s;
    proxy_send_timeout 120s;
}
```

If Nginx runs as a Docker container, it must be on the same Docker network as this stack. Then proxy to:

```text
http://web:5000
```

If it is not on the same Docker network, use the host mapping instead:

```text
http://host.docker.internal:8080
```

On Linux, `host.docker.internal` may need to be added to the Nginx container with:

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

## Notes

- The database backup restores only when the Postgres volume is empty.
- If you need to restore the backup again, remove the stack volume named like `<stack>_postgres_data` and redeploy.
- The website calls the .NET API through `/api-proxy`, so users only need access to the website URL.
- The direct .NET API container is internal to Docker unless you add a public port mapping.
- A `504 Gateway Time-out` from Nginx usually means Nginx is pointing at the wrong upstream host/port or cannot reach the Docker network.
