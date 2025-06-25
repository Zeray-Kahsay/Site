using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Site.API.Entities.Chat;
using Site.API.Entities.IdentityUser;
using Site.API.Entities.Item;

namespace Site.API.Data;

public class SiteDbContext : IdentityDbContext
      <AppUser, AppRole, int,
      IdentityUserClaim<int>,
      AppUserRole,
      IdentityUserLogin<int>,
      IdentityRoleClaim<int>,
      IdentityUserToken<int>>
{
       public SiteDbContext(DbContextOptions options) : base(options) { }

       protected override void OnModelCreating(ModelBuilder builder)
       {
              base.OnModelCreating(builder);

              builder.Entity<Category>().HasData(
              new Category { Id = 1, Name = "Residential" },
              new Category { Id = 2, Name = "Business" }
);

              builder.Entity<ItemType>().HasData(
              new ItemType { Id = 1, Name = "Rent" },
              new ItemType { Id = 2, Name = "Sell" }
              );


              builder.Entity<Item>()
                     .HasOne(i => i.Type)
                     .WithMany(t => t.Items)
                     .HasForeignKey(i => i.TypeId);

              builder.Entity<Item>()
                  .HasOne(i => i.Category)
                  .WithMany(c => c.Items)
                  .HasForeignKey(i => i.CategoryId);

              builder.Entity<ItemPhoto>()
                  .HasOne(p => p.Item)
                  .WithMany(i => i.Photos)
                  .HasForeignKey(p => p.ItemId);


              // M-M
              builder.Entity<AppUser>()
                     .HasMany(au => au.UserRoles)
                     .WithOne(ur => ur.User)
                     .HasForeignKey(ur => ur.UserId)
                     .IsRequired();

              builder.Entity<AppRole>()
                     .HasMany(ap => ap.UserRoles)
                     .WithOne(ur => ur.Role)
                     .HasForeignKey(ar => ar.RoleId)
                     .IsRequired();

              builder.Entity<Message>()
                     .HasOne(m => m.Recipient)
                     .WithMany(x => x.MessageReceived)
                     .OnDelete(DeleteBehavior.Restrict);

              builder.Entity<Message>()
                     .HasOne(x => x.Sender)
                     .WithMany(x => x.MessageSent)
                     .OnDelete(DeleteBehavior.Restrict);
       }

       public DbSet<Item> Items { get; set; }
       public DbSet<Category> Categories { get; set; }
       public DbSet<ItemType> ItemTypes { get; set; }
       public DbSet<Message> Messages { get; set; }
}
