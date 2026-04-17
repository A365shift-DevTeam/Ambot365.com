# A365 Shift Backend (.NET + PostgreSQL)

This backend provides a registration API for your website.

## Tech stack
- ASP.NET Core 9 Web API
- Entity Framework Core
- PostgreSQL (`Npgsql`)

## API endpoint
- `POST /api/auth/register`

Request body:
```json
{
  "fullName": "Arul Raj",
  "email": "arul@example.com",
  "mobileNumber": "+919876543210"
}
```

Success response: `201 Created`
```json
{
  "userId": "guid",
  "fullName": "Arul Raj",
  "email": "arul@example.com",
  "mobileNumber": "+919876543210",
  "createdAtUtc": "2026-04-17T12:00:00Z",
  "message": "Registration successful."
}
```

## Database setup
1. Create a PostgreSQL database named `a365shift_db`.
2. Update connection string in:
   - `A365Shift.Api/appsettings.json`
   - `A365Shift.Api/appsettings.Development.json`

Default connection string:
`Host=localhost;Port=5432;Database=a365shift_db;Username=postgres;Password=postgres`

## Run backend
From the `Backend` folder:

```powershell
dotnet restore A365ShiftAutomation.sln --configfile NuGet.Config
dotnet build A365ShiftAutomation.sln --no-restore
dotnet run --project A365Shift.Api
```

## Create DB schema (EF migration)
From the `Backend` folder:

```powershell
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate --project A365Shift.Api
dotnet ef database update --project A365Shift.Api
```

## CORS
Allowed frontend origins are in `Cors:AllowedOrigins` and include:
- `http://localhost:5173`
- `http://localhost:3000`
