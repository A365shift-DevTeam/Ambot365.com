namespace A365Shift.Api.Models;

public class AppUser
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public ServiceType ServiceType { get; set; }
    public string? ProjectGoal { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
