using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Backend.Data;
using Backend.Models;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] UserLoginDto userLoginDto)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == userLoginDto.Username);

            if (existingUser != null)
            {
                return BadRequest("Username is already taken.");
            }

            var salt = Encoding.UTF8.GetBytes(Guid.NewGuid().ToString());
            var hashedPassword = Encoding.UTF8.GetBytes(userLoginDto.Password);

            var user = new User
            {
                Username = userLoginDto.Username,
                PasswordHash = Convert.ToBase64String(hashedPassword),
                PasswordSalt = Convert.ToBase64String(salt)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] UserLoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginDto.Username);

            if (user == null)
                return Unauthorized("Invalid username or password.");

            var hashedPassword = Encoding.UTF8.GetBytes(loginDto.Password);
            if (Convert.ToBase64String(hashedPassword) != user.PasswordHash)
                return Unauthorized("Invalid username or password.");

            return Ok("Login successful");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<User>>> SearchUsers([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query)) return BadRequest("Query cannot be empty.");
            
            var users = await _context.Users
                .Where(u => u.Username.ToLower().Contains(query.ToLower()))
                .ToListAsync();

            return users;
        }
    }
}