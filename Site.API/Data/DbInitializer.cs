using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Site.API.Entities.IdentityUser;
using Site.API.Entities.Item;

namespace Site.API.Data;

public class DbInitializer
{
  public static async Task SeedAsync(UserManager<AppUser> userManager, SiteDbContext context, RoleManager<AppRole> roleManager)
  {
    if (await userManager.Users.AnyAsync()) return;

    var roles = new List<AppRole>
    {
      new(){Name = "Admin"},
      new(){Name = "user"},
      new(){Name = "Moderator"}
    };

    foreach (var role in roles)
    {
      await roleManager.CreateAsync(role);
    }

    // 1. Create demo user if not exists
    var users = new List<AppUser>
    {
      new (){ UserName = "alice", Email = "alice@test.com",PhoneNumber= "9876543" },
      new() { UserName = "bob", Email = "bob@test.com", PhoneNumber="60823489" },
      new () {UserName = "zer", Email="zer@test.com", PhoneNumber= "7777777"}
    };

    foreach (var user in users)
    {
      if (!string.IsNullOrEmpty(user.UserName) && await userManager.FindByNameAsync(user.UserName) == null)
      {
        await userManager.CreateAsync(user, "Password123");
        await userManager.AddToRoleAsync(user, "User");
      }
    }

    var admin = new AppUser
    {
      FirstName = "Adminstrator",
      LastName = "Adminstrator",
      UserName = "admin@gmail.com",
      Email = "admin@gmail.com",
      Description = "I'm admin",
      PhotoUrl = "https://picsum.photos/200",
      SecurityStamp = new Guid().ToString()
    };

    await userManager.CreateAsync(admin, "Pa$$w0rd");
    await userManager.AddToRolesAsync(admin, ["User", "Moderator", "Admin"]);

    // 2. Create sample Items if none exist
    if (!context.Items.Any())
    {
      var items = new List<Item>
            {
                new() {
                    Title = "Modern Apartment Downtown",
                    Description = "Spacious 2-bedroom apartment in the city center.",
                    OwnerId = users[0].Id,
                    TypeId = 1, // Rent
                    CategoryId = 1, // Residential
                    Price = 1500,
                    Location = "Oslo, Norway",
                    MinRentalDuration = 6,
                    Status = ItemStatus.Active,
                    IsPaid = true

                },
                new () {
                    Title = "Office Space for Sale",
                    Description = "Great investment opportunity, commercial office.",
                    OwnerId = users[1].Id,
                    TypeId = 2, // Sell
                    CategoryId = 2, // Business
                    Price = 200000,
                    Location = "Bergen, Norway",
                    Status = ItemStatus.Active,
                    IsPaid = true

                },
                  new() {
                    Title = "Modern Apartment Downtown",
                    Description = "Spacious 2-bedroom apartment in the city center.",
                    OwnerId = users[2].Id,
                    TypeId = 1, // Rent
                    CategoryId = 1, // Residential
                    Price = 1500,
                    Location = "Oslo, Norway",
                    MinRentalDuration = 6,
                    Status = ItemStatus.Active,
                                        IsPaid = true

                },
                  new() {
                    Title = "Modern Apartment Downtown",
                    Description = "Spacious 2-bedroom apartment in the city center.",
                    OwnerId = users[0].Id,
                    TypeId = 2, // Rent
                    CategoryId = 1, // Residential
                    Price = 1500,
                    Location = "Oslo, Norway",
                    MinRentalDuration = 6,
                    Status = ItemStatus.Active,
                                        IsPaid = true

                },
                  new() {
                    Title = "Modern Apartment Downtown",
                    Description = "Spacious 2-bedroom apartment in the city center.",
                    OwnerId = users[1].Id,
                    TypeId = 1, // Rent
                    CategoryId = 2, // Residential
                    Price = 1500,
                    Location = "Oslo, Norway",
                    MinRentalDuration = 6,
                    Status = ItemStatus.Active,
                                        IsPaid = true

                },
                  new() {
                    Title = "Modern Apartment Downtown",
                    Description = "Spacious 2-bedroom apartment in the city center.",
                    OwnerId = users[2].Id,
                    TypeId = 2, // Rent
                    CategoryId = 1, // Residential
                    Price = 1500,
                    Location = "Oslo, Norway",
                    MinRentalDuration = 6,
                    Status = ItemStatus.Active,
                                        IsPaid = true

                },
                  new() {
                    Title = "Modern Apartment Downtown",
                    Description = "Spacious 2-bedroom apartment in the city center.",
                    OwnerId = users[0].Id,
                    TypeId = 1, // Rent
                    CategoryId = 2, // Residential
                    Price = 1500,
                    Location = "Oslo, Norway",
                    MinRentalDuration = 6,
                    Status = ItemStatus.Active,
                                        IsPaid = true

                },
                  new() {
                    Title = "Modern Apartment Downtown",
                    Description = "Spacious 2-bedroom apartment in the city center.",
                    OwnerId = users[1].Id,
                    TypeId = 2, // Rent
                    CategoryId = 1, // Residential
                    Price = 1500,
                    Location = "Oslo, Norway",
                    MinRentalDuration = 6,
                    Status = ItemStatus.Active,
                                        IsPaid = true

                },
            };

      context.Items.AddRange(items);
      await context.SaveChangesAsync();
    }
  }
}

