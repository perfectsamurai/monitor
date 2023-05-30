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
                dynamogram.Date = DateTime.Now.ToString();

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
        public async Task<IActionResult> ImportFromExcel([FromForm] IFormFile excelFile, [FromForm] int userId, [FromForm] int wellId)
        {
            if (excelFile != null && excelFile.Length > 0)
            {
                using (var stream = new MemoryStream())
                {
                    await excelFile.CopyToAsync(stream);
                    using (var spreadsheetDoc = SpreadsheetDocument.Open(stream, false))
                    {
                        var workbookPart = spreadsheetDoc.WorkbookPart;
                        var worksheetPart = workbookPart.WorksheetParts.First();
                        var worksheet = worksheetPart.Worksheet;
                        var sheetData = worksheet.GetFirstChild<SheetData>();

                        var rows = sheetData.Elements<Row>().Skip(1);

                        foreach (var row in rows)
                        {
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

                            var dynamogram = new Dynamogram
                            {
                                WellId = wellId,
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

                            int VarQ_G = _context.Guides.First(q => q.WellId == wellId).VarQ;
                            int VarPMax_G = _context.Guides.First(q => q.WellId == wellId).VarPmax;
                            int VarPMin_G = _context.Guides.First(q => q.WellId == wellId).VarPmin;
                            int VarN_G = _context.Guides.First(q => q.WellId == wellId).VarN;
                            int VarL_G = _context.Guides.First(q => q.WellId == wellId).VarL;
                            int VarKPod_G = _context.Guides.First(q => q.WellId == wellId).VarKpod;
                            int VarKNap_G = _context.Guides.First(q => q.WellId == wellId).VarKnap;
                            int VarG_G = _context.Guides.First(q => q.WellId == wellId).VarG;

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
                                await _context.SaveChangesAsync();
                            }
                            if (varQ < VarQ_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 2,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varPmax > VarPMax_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 3,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varPmax <  VarPMax_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 4,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varPmin > VarPMin_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 5,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varPmin < VarPMin_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 6,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varN > VarN_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 7,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varN < VarN_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 8,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varL > VarL_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 9,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varL < VarL_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 10,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varKpod > VarKPod_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 11,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varKpod < VarKPod_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 12,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varKnap > VarKNap_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 13,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varKnap < VarKNap_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 14,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varG > VarG_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 15,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                            if (varG < VarG_G)
                            {
                                Advice advice = new Advice()
                                {
                                    DynamogramId = dynamogram.DynamogramId,
                                    AdviceTextId = 16,
                                    RoleId = 1,
                                };

                                _context.Advices.Add(advice);
                                await _context.SaveChangesAsync();
                            }
                        }
                    }
                }
            }

            return Ok();
        }


    }
}

