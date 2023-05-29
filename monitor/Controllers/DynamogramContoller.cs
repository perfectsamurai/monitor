using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using monitor.Models;
using Polly;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace monitor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamogramContoller : ControllerBase
    {
        private readonly MonitoringContext _dbContext;

        public DynamogramContoller(MonitoringContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetDynamograms")]
      
        public IActionResult GetDynamograms()
        {
            var dynamograms = _dbContext.Dynamograms
                .Include(d => d.Well)
                .Include(d => d.User)
                .ToList();

            var dynamogramDTOs = dynamograms.Select(d => new Dynamogram
            {
                DynamogramId = d.DynamogramId,
                WellId = d.WellId,
                Date = d.Date,
                VarQ= d.VarQ,
                VarPmax = d.VarPmax,
                VarPmin = d.VarPmin,
                TypeDevice = d.TypeDevice,
                VarN = d.VarN,
                VarL = d.VarL,
                VarKpod = d.VarKpod,
                VarKnap = d.VarKnap,
                Opinion = d.Opinion,
                VarG = d.VarG,
                UserId = d.UserId,

                // Продолжайте копировать свойства Dynamogram в DTO
            }).ToList();

            var wellIds = dynamogramDTOs.Select(d => d.WellId).Distinct().ToList();
            var wells = _dbContext.Wells.Where(w => wellIds.Contains(w.WellId)).ToList();

            var UserIds = dynamogramDTOs.Select(d => d.UserId).Distinct().ToList();
            var users = _dbContext.Users.Where(u => UserIds.Contains(u.UserId)).ToList();

            var wellDTOs = wells.Select(w => new Well
            {
                WellId = w.WellId,
                Name = w.Name,
                // Продолжайте копировать свойства Well в DTO
            }).ToList();
            var userDTOs = users.Select(w => new User
            {
                UserId = w.UserId,
                FirstName = w.FirstName,
                LastName = w.LastName,
                // Продолжайте копировать свойства Well в DTO
            }).ToList();

            foreach (var dynamogramDTO in dynamogramDTOs)
            {
                dynamogramDTO.Well = wellDTOs.FirstOrDefault(w => w.WellId == dynamogramDTO.WellId);
                dynamogramDTO.User = userDTOs.FirstOrDefault(w => w.UserId == dynamogramDTO.UserId);
            }

            return Ok(dynamogramDTOs);
        }

    }
}
