using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MessagesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("thread")]
        public async Task<ActionResult<IEnumerable<Message>>> GetThreadMessages()
        {
            var messages = await _context.Messages
                .Where(m => m.ReceiverId == null)
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();

            return Ok(messages);
        }

        [HttpGet("private/{userId}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetUserMessages(int userId)
        {
            var messages = await _context.Messages
                .Where(m => (m.SenderId == userId || m.ReceiverId == userId))
                .OrderBy(m => m.SentAt)
                .ToListAsync();

            return Ok(messages);
        }

        [HttpPost("thread")]
        public async Task<ActionResult<Message>> PostThreadMessage(Message message)
        {
            message.ReceiverId = null;

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetThreadMessages), new { id = message.Id }, message);
        }

        [HttpPost("private")]
        public async Task<ActionResult<Message>> PostPrivateMessage(Message message)
        {
            if (message.ReceiverId == null)
            {
                return BadRequest("ReceiverId is required for private messages.");
            }

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserMessages), new { userId = message.SenderId }, message);
        }
    }
}