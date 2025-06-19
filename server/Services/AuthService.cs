using server.Models;
using server.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace server.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterAsync(string username, string password, string email)
        {
            if (await _context.Users.AnyAsync(u => u.Username == username || u.Email == email))
                return false;

            string salt = GenerateSalt();
            string hashedPassword = HashPassword(password + salt);

            var user = new User
            {
                Username = username,
                PasswordHash = hashedPassword,
                Salt = salt,
                Email = email,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();  // <- this writes to DB
            return true;
        }

        public async Task<User?> ValidateUserAsync(string username, string password)
        {
            // Try to fetch the user
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user is null || string.IsNullOrWhiteSpace(user.Salt))
                return null;

            // Rehash the input password using the user's stored salt
            string hashedInput = HashPassword(password + user.Salt);

            // Compare stored hash with input hash
            return hashedInput == user.PasswordHash ? user : null;
        }
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            return Convert.ToBase64String(sha256.ComputeHash(bytes));
        }
        private string GenerateSalt(int size = 32)
        {
            var saltBytes = new byte[size];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(saltBytes);
            return Convert.ToBase64String(saltBytes);
        }
    }
}
