using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Site.API.Entities.IdentityUser;
using Site.API.Entities.Item;

namespace Site.API.Data;

public class DbInitializer
{




  public static async Task SeedAsync(UserManager<AppUser> userManager, SiteDbContext context)
  {
    if (await userManager.Users.AnyAsync()) return;

    // 1. Create demo user if not exists
    var user = await userManager.FindByEmailAsync("demo@owner.com");
    if (user == null)
    {
      user = new AppUser { UserName = "demo@owner.com", Email = "demo@owner.com", PhoneNumber = "1234567890" };
      await userManager.CreateAsync(user, "Demo@123");
    }

    // 2. Create sample Items if none exist
    if (!context.Items.Any())
    {
      var items = new List<Item>
            {
                new() {
                    Title = "Modern Apartment Downtown",
                    Description = "Spacious 2-bedroom apartment in the city center.",
                    OwnerId = user.Id,
                    TypeId = 1, // Rent
                    CategoryId = 1, // Residential
                    Price = 1500,
                    Location = "Oslo, Norway",
                    MinRentalDuration = 6,
                    Status = ItemStatus.Active
                },
                new () {
                    Title = "Office Space for Sale",
                    Description = "Great investment opportunity, commercial office.",
                    OwnerId = user.Id,
                    TypeId = 2, // Sell
                    CategoryId = 2, // Business
                    Price = 200000,
                    Location = "Bergen, Norway",
                    Status = ItemStatus.Active
                }
            };

      context.Items.AddRange(items);
      await context.SaveChangesAsync();
    }
  }
}

