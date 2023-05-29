using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using monitor.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using ClosedXML.Excel;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace monitoring.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddDynamogramController : ControllerBase
    {
        private readonly MonitoringContext _context;

        public AddDynamogramController(MonitoringContext context)
        {
            _context = context;
        }

        // Метод для получения списка записей из таблицы Well
        [HttpGet]
        [Route("GetWellList")]
        public async Task<IActionResult> GetWellList()
        {
            List<Well> wellList = await _context.Wells.ToListAsync();
            return Ok(wellList);
        }

        [HttpPost]
        [Route("PostDynamogram")]
        public async Task<IActionResult> PostDynamogram(Dynamogram dynamogram)
        {
            if (ModelState.IsValid)
            {
                int VarQ_G = _context.Guides.First(q => q.WellId == dynamogram.WellId).VarQ;
                int VarPMax_G = _context.Guides.First(q => q.WellId == dynamogram.WellId).VarPmax;
                int VarPMin_G = _context.Guides.First(q => q.WellId == dynamogram.WellId).VarPmin;
                int VarN_G = _context.Guides.First(q => q.WellId == dynamogram.WellId).VarN;
                int VarL_G = _context.Guides.First(q => q.WellId == dynamogram.WellId).VarL;
                int VarKPod_G = _context.Guides.First(q => q.WellId == dynamogram.WellId).VarKpod;
                int VarKNap_G = _context.Guides.First(q => q.WellId == dynamogram.WellId).VarKnap;
                int VarG_G = _context.Guides.First(q => q.WellId == dynamogram.WellId).VarG;

                _context.Dynamograms.Add(dynamogram);
                await _context.SaveChangesAsync();
                if (dynamogram.VarQ > VarQ_G)
                {
                    Advice advice = new Advice()
                    {
                        DynamogramId = dynamogram.DynamogramId,
                        AdviceTextId = 1,
                        RoleId = 1,
                    };

                    _context.Advices.Add(advice);
                    _context.SaveChanges();
                }

                return Ok();
            }

            return BadRequest();
        }
        [HttpPost]
        [Route("ImportFromExcel")]
        public async Task<IActionResult> ImportFromExcel(IFormFile excelFile, int userId, [Bind("WellId")] Dynamogram dynamograms)
        {
            if (excelFile != null && excelFile.Length > 0)
            {
                using (var stream = excelFile.OpenReadStream())
                {
                    using (var spreadsheetDoc = SpreadsheetDocument.Open(stream, false))
                    {
                        var workbookPart = spreadsheetDoc.WorkbookPart;
                        var worksheetPart = workbookPart.WorksheetParts.First();
                        var worksheet = worksheetPart.Worksheet;
                        var sheetData = worksheet.GetFirstChild<SheetData>();

                        var rows = sheetData.Elements<Row>().Skip(1); // Пропуск заголовка, начало с 2-й строки

                        foreach (var row in rows)
                        {
                            // Чтение значений ячеек и сохранение данных


                            var date = DateTime.Now.ToString();
                            var varQ = int.Parse(row.Elements<Cell>().ElementAt(0).CellValue.Text);
                            var varPmax = int.Parse(row.Elements<Cell>().ElementAt(1).CellValue.Text);
                            var varPmin = int.Parse(row.Elements<Cell>().ElementAt(2).CellValue.Text);
                            var typeDevice = row.Elements<Cell>().ElementAt(3).CellValue.Text;
                            var varN = int.Parse(row.Elements<Cell>().ElementAt(4).CellValue.Text);
                            var varL = int.Parse(row.Elements<Cell>().ElementAt(5).CellValue.Text);
                            var varKpod = int.Parse(row.Elements<Cell>().ElementAt(6).CellValue.Text);
                            var varKnap = int.Parse(row.Elements<Cell>().ElementAt(7).CellValue.Text);
                            var opinion = row.Elements<Cell>().ElementAt(8).CellValue.Text;
                            var varG = int.Parse(row.Elements<Cell>().ElementAt(9).CellValue.Text);

                            // Сохранение данных в базе данных или другое действие

                            // Пример сохранения данных в базе данных
                            var dynamogram = new Dynamogram
                            {
                                WellId = dynamograms.WellId,
                                Date = date,
                                VarQ = varQ,
                                VarPmax = varPmax,
                                VarPmin = varPmin,
                                TypeDevice = typeDevice,
                                VarN = varN,
                                VarL = varL,
                                VarKpod = varKpod,
                                VarKnap = varKnap,
                                Opinion = opinion,
                                VarG = varG,
                                UserId = userId
                            };
                            int VarQ_G = _context.Guides.First(q => q.WellId == dynamograms.WellId).VarQ;
                            int VarPMax_G = _context.Guides.First(q => q.WellId == dynamograms.WellId).VarPmax;
                            int VarPMin_G = _context.Guides.First(q => q.WellId == dynamograms.WellId).VarPmin;
                            int VarN_G = _context.Guides.First(q => q.WellId == dynamograms.WellId).VarN;
                            int VarL_G = _context.Guides.First(q => q.WellId == dynamograms.WellId).VarL;
                            int VarKPod_G = _context.Guides.First(q => q.WellId == dynamograms.WellId).VarKpod;
                            int VarKNap_G = _context.Guides.First(q => q.WellId == dynamograms.WellId).VarKnap;
                            int VarG_G = _context.Guides.First(q => q.WellId == dynamograms.WellId).VarG;

                            _context.Dynamograms.Add(dynamogram);
                            await _context.SaveChangesAsync();
                            if (varQ > VarQ_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 1,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);



                            }

                            _context.SaveChanges();
                        }
                    }
                }
            }

            return Ok();

        }
    }
}
