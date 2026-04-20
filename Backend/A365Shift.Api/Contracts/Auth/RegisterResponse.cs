namespace A365Shift.Api.Contracts.Auth;

public class RegisterResponse
{
    public long UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public string ServiceType { get; set; } = string.Empty;
    public string? ProjectGoal { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public string Message { get; set; } = string.Empty;
}
