using NpgsqlTypes;

namespace A365Shift.Api.Models;

public enum ServiceType
{
    [PgName("Agents")]
    Agents = 1,
    [PgName("Microsoft Apps")]
    MicrosoftApps = 2,
    [PgName("Websites")]
    Websites = 3,
    [PgName("Products")]
    Products = 4,
    [PgName("Web & Mobile App")]
    WebAndMobileApp = 5
}
