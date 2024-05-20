using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Runtime.CompilerServices;

namespace App.Server.Contacts.Models
{
    public class Contact
    {
        public string Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Firstname { get; set; }

        [Required]
        [StringLength(30)]
        public string Lastname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string? PhoneNumber { get; set; }

        [DataType(DataType.Date)]
        public DateOnly? Birthday { get; set; }

        public string? CategoryId { get; set; }
        public ContactCategory? Category { get; set; }

    }
}
