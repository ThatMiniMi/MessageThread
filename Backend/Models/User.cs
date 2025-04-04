namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = null!;
        public string PasswordSalt { get; set; } = null!;
    }
}

