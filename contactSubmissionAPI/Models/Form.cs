using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactSubmissionAPI.Models
{
    public class Form
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
