using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;


namespace BookApp.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private static readonly List<User> Users = new List<User>(); // Replace with database in a real app



        // POST: api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = Users.SingleOrDefault(u => u.Username == request.Username);

            // Replace this with your real user validation logic
            if (request.Username == "admin" && request.Password == "password")
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes("MySuperSecureAndLongerKey123456789!");

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim(ClaimTypes.Name, request.Username)
                }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    Issuer = "https://localhost:7149",
                    Audience = "api",
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new { Token = tokenString });
            }

            return Unauthorized(); // Return 401 if login fails
        }
    }
        // User model for storing user credentials
        public class User
    {
        internal object Email;

        public string Username { get; set; }
        public string PasswordHash { get; set; }
    }

  
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
