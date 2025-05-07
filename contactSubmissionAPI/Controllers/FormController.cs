using ContactSubmissionAPI.Data;
using ContactSubmissionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactSubmissionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormController : Controller
    {
        private readonly AppDbContext _context;
        public FormController(AppDbContext context) => _context = context;


        [HttpGet]
        public async Task<IActionResult> GetUsers() =>
        Ok(await _context.Forms.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> CreateUser(Form form)
        {
            var lastForm = await _context.Forms
                                  .OrderByDescending(f => f.Id)
                                  .FirstOrDefaultAsync();

            form.Id = lastForm != null ? lastForm.Id + 1 : 1;

            _context.Forms.Add(form);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateUser), new { id = form.Id }, form);
        }
    }
}
