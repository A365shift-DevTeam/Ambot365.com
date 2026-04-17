using A365Shift.Api.Contracts.Auth;
using A365Shift.Api.Data;
using A365Shift.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace A365Shift.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext dbContext) : ControllerBase
{
    private static readonly Dictionary<string, ServiceType> ServiceTypeMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["Agents"] = ServiceType.Agents,
        ["Microsoft Apps"] = ServiceType.MicrosoftApps,
        ["Websites"] = ServiceType.Websites,
        ["Products"] = ServiceType.Products,
        ["Web & Mobile App"] = ServiceType.WebAndMobileApp
    };

    [HttpPost("register")]
    [ProducesResponseType<RegisterResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var normalizedMobileNumber = NormalizeMobileNumber(request.MobileNumber);
        var normalizedServiceType = request.ServiceType.Trim();

        if (!ServiceTypeMap.TryGetValue(normalizedServiceType, out var parsedServiceType))
        {
            return BadRequest(new
            {
                message = "Invalid service type. Allowed values: Agents, Microsoft Apps, Websites, Products, Web & Mobile App."
            });
        }

        var emailAlreadyExists = await dbContext.Users
            .AsNoTracking()
            .AnyAsync(user => user.Email == normalizedEmail, cancellationToken);

        if (emailAlreadyExists)
        {
            return Conflict(new { message = "A user with this email already exists." });
        }

        var user = new AppUser
        {
            FullName = request.FullName.Trim(),
            Email = normalizedEmail,
            MobileNumber = normalizedMobileNumber,
            ServiceType = parsedServiceType,
            ProjectGoal = NormalizeOptionalText(request.ProjectGoal)
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync(cancellationToken);

        var response = new RegisterResponse
        {
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            MobileNumber = user.MobileNumber,
            ServiceType = ToServiceTypeLabel(user.ServiceType),
            ProjectGoal = user.ProjectGoal,
            CreatedAtUtc = user.CreatedAtUtc,
            Message = "Registration successful."
        };

        return Created($"/api/auth/users/{user.Id}", response);
    }

    private static string NormalizeMobileNumber(string mobileNumber)
    {
        return mobileNumber.Trim().Replace(" ", string.Empty).Replace("-", string.Empty);
    }

    private static string? NormalizeOptionalText(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return value.Trim();
    }

    private static string ToServiceTypeLabel(ServiceType serviceType)
    {
        return serviceType switch
        {
            ServiceType.Agents => "Agents",
            ServiceType.MicrosoftApps => "Microsoft Apps",
            ServiceType.Websites => "Websites",
            ServiceType.Products => "Products",
            ServiceType.WebAndMobileApp => "Web & Mobile App",
            _ => "Agents"
        };
    }
}
