using System.ComponentModel.DataAnnotations;

namespace A365Shift.Api.Contracts.Auth;

public class RegisterRequest
{
    [Required]
    [StringLength(120, MinimumLength = 2)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^\+?[1-9]\d{7,14}$", ErrorMessage = "Mobile number must be in international format.")]
    [StringLength(16)]
    public string MobileNumber { get; set; } = string.Empty;

    [Required]
    public string ServiceType { get; set; } = string.Empty;

    public string? ProjectGoal { get; set; }
}
