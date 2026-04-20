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
POSTGRES_DB=a365shift_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=change-this-password
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password
```

5. Deploy the stack.
6. Open the website on port `8080`, or point your reverse proxy/domain to the `web` service on port `5000`.

## Notes

- The database backup restores only when the Postgres volume is empty.
- If you need to restore the backup again, remove the stack volume named like `<stack>_postgres_data` and redeploy.
- The website calls the .NET API through `/api-proxy`, so users only need access to the website URL.
- The direct .NET API container is internal to Docker unless you add a public port mapping.
