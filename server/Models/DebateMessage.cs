using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class DebateMessage
    {
        [Key]
        public int Id { get; set; }

        public int SessionId { get; set; }
        public DebateSession Session { get; set; }

        [Required]
        public string Speaker { get; set; }

        [Required]
        public string Side { get; set; }  // Government / Opposition

        public string Text { get; set; }

        public bool IsPOI { get; set; } = false;

        public int? ReplyToId { get; set; }  // null if not a reply

        public DateTime TimeStamp { get; set; } = DateTime.UtcNow;
    }
}
