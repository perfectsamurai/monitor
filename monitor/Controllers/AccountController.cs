using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using monitor.Models;
using System.Text;
using System.Security.Cryptography;
using System.Text;

namespace monitoring.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : Controller
    {
        private readonly MonitoringContext _context;

        public AccountController(MonitoringContext context)
        {
            _context = context;
        }
        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var hash = BitConverter.ToString(hashedBytes).Replace("_", "").ToLower();

                return hash;
            }
        }



        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(User user)
        {
            if (ModelState.IsValid)
            {
                User users = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.Password == HashPassword(user.Password));
                if (users != null)
                {

                    Response.Cookies.Append("UserId", $"{users.UserId}");
                    Response.Cookies.Append("FirstName", $"{users.FirstName}");
                    Response.Cookies.Append("LastName", $"{users.LastName}");
                    Response.Cookies.Append("NgduId", $"{users.NgduId}");
                    Response.Cookies.Append("Phone", $"{users.Phone}");
                    Response.Cookies.Append("Email", $"{users.Email}");

                    // Дополнительная логика установки куки и перенаправления

                    return Ok(); // Возвращаем успешный результат
                }
                ModelState.AddModelError("", "Некорректные почта и(или) пароль");
            }
            return BadRequest(ModelState); // Возвращаем ошибку с некорректными данными
        }
        [HttpPost]
        [Route("Logout")]
        public IActionResult Logout()
        {
            // Очистка куков
            Response.Cookies.Delete("UserId");
            Response.Cookies.Delete("FirstName");
            Response.Cookies.Delete("LastName");
            Response.Cookies.Delete("NgduId");
            Response.Cookies.Delete("Phone");
            Response.Cookies.Delete("Email");

            // Дополнительная логика выхода
            // ...

            return Ok(); // Возвращаем успешный результат
        }

        [HttpGet("GetRole/{userId}")]
        public async Task<IActionResult> GetRole(int userId)
        {
            // Получение роли пользователя на основе userId
            User user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
            {
                return NotFound();
            }

            Role role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleId == user.RoleId);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(new { name = role.Name });
        }



    }
}