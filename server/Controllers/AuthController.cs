using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models.Dtos;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly JwtService _jwtService;

        public AuthController(AuthService authService, JwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) ||
                string.IsNullOrWhiteSpace(user.Password) ||
                string.IsNullOrWhiteSpace(user.Email))
            {
                return BadRequest("Username, password, and email are required.");
            }

            var success = await _authService.RegisterAsync(user.Username, user.Password, user.Email);
            if (!success)
            {
                return BadRequest("Username or email already exists.");
            }

            return Ok(new { message = "Registered successfully." });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest("Username and password are required.");
            }

            var validUser = await _authService.ValidateUserAsync(user.Username, user.Password);
            if (validUser == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = _jwtService.GenerateToken(validUser.Username);
            return Ok(new { token });
        }
    }
}
