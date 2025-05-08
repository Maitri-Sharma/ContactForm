using ContactSubmissionAPI.Data;
using ContactSubmissionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace ContactSubmissionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactFormController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ContactFormController> _logger;
        public ContactFormController(AppDbContext context, ILogger<ContactFormController> logger)
        {

            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Fetch the contact details of users
        /// </summary>
        /// <returns>Contact details</returns>
        [HttpGet("GetContactDetails", Name = nameof(GetContactDetails))]
        public async Task<IActionResult> GetContactDetails()
        {
            try
            {
                var contacts = await _context.Forms.ToListAsync();
                return Ok(contacts);  // Ensure to return the result
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Error in GetContactDetails: " + exception.Message);
                return StatusCode(500, "An error occurred while getting the contact details.");  // Return an error status code
            }
        }

        /// <summary>
        /// Saves the Contact data of Users
        /// </summary>
        /// <param name="contactForm">Contact details of the users</param>
        /// <returns>Contact details</returns>
        [HttpPost("UpdateContactDetails", Name = nameof(UpdateContactDetails))]
        public async Task<IActionResult> UpdateContactDetails(ContactForm contactForm)
        {
            try
            { 
            var lastContactdata = await _context.Forms
                                  .OrderByDescending(f => f.Id)
                                  .FirstOrDefaultAsync();

            contactForm.Id = lastContactdata != null ? lastContactdata.Id + 1 : 1;

            _context.Forms.Add(contactForm);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContactDetails), new { id = contactForm.Id }, contactForm);
            }
            catch(Exception exception)
            {
                _logger.LogError(exception, "Error in UpdateContactDetails: " + exception.Message);
                return StatusCode(500, "An error occurred while updating the contact details.");
            }
        }
    }
}
