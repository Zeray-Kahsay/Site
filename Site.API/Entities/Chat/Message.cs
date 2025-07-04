
using Site.API.Entities.IdentityUser;

namespace Site.API.Entities.Chat;

public class Message
{
  public int Id { get; set; }
  public required string SenderUserName { get; set; }
  public required string RecipientUserName { get; set; }
  public required string Content { get; set; }
  public DateTime? DateRead { get; set; }
  public DateTime MessageSent { get; set; } = DateTime.UtcNow;
  public bool SenderDeleted { get; set; }
  public bool RecipientDeleted { get; set; }
  public int SenderId { get; set; }
  public AppUser Sender { get; set; } = null!;
  public int RecipientId { get; set; }
  public AppUser Recipient { get; set; } = null!;

}
