using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class DebateSession
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Motion { get; set; }

        [Required]
        public string Format { get; set; }  // "Asian" or "British"

        public bool IsFinished { get; set; } = false;

        public string? Winner { get; set; }

        public string RolePlayed { get; set; }

        public DateTime StartedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public User User { get; set; }

        public List<DebateMessage> Messages { get; set; } = new();
        public JudgmentResult? Judgment { get; set; }
    }
}
