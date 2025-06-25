using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Site.API.Entities.Chat;
using Site.API.Entities.IdentityUser;

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
}
