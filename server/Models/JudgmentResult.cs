using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class JudgmentResult
    {
        [Key]
        public int Id { get; set; }

        public int SessionId { get; set; }
        public DebateSession Session { get; set; }

        public string Winner { get; set; }

        public string OverallFeedback { get; set; }

        public string ScoresJson { get; set; }  // Serialized object like { "PM": {...} }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
