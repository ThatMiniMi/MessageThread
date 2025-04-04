namespace Backend.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public int SenderId { get; set; }
        public User Sender { get; set; } = null!;
        public int? ReceiverId { get; set; }
        public User? Receiver { get; set; } 
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
}


