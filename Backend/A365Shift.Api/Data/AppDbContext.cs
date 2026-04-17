using A365Shift.Api.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace A365Shift.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<AppUser> Users => Set<AppUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasPostgresEnum<ServiceType>("service_type_enum");

        modelBuilder.Entity<AppUser>()
            .HasIndex(user => user.Email)
            .IsUnique();

        modelBuilder.Entity<AppUser>()
            .Property(user => user.Email)
            .HasMaxLength(255);

        modelBuilder.Entity<AppUser>()
            .Property(user => user.FullName)
            .HasMaxLength(120);

        modelBuilder.Entity<AppUser>()
            .Property(user => user.MobileNumber)
            .HasMaxLength(16);

        modelBuilder.Entity<AppUser>()
            .Property(user => user.ServiceType)
            .HasColumnType("service_type_enum");
    }
}
