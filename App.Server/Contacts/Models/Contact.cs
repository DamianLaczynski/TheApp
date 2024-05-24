using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Runtime.CompilerServices;

namespace App.Server.Contacts.Models
{
    /// <summary>
    /// Represents a contact entity.
    /// </summary>
    public class Contact
    {
        /// <summary>
        /// Gets or sets the unique identifier for the contact.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the first name of the contact.
        /// </summary>
        [Required]
        [StringLength(30)]
        public string Firstname { get; set; }

        /// <summary>
        /// Gets or sets the last name of the contact.
        /// </summary>
        [Required]
        [StringLength(30)]
        public string Lastname { get; set; }

        /// <summary>
        /// Gets or sets the email of the contact.
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the phone number of the contact.
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Gets or sets the birthday of the contact.
        /// </summary>
        [DataType(DataType.Date)]
        public DateOnly? Birthday { get; set; }

        /// <summary>
        /// Gets or sets the category identifier for the contact.
        /// </summary>
        public string? CategoryId { get; set; }

        /// <summary>
        /// Gets or sets the category of the contact.
        /// </summary>
        [ForeignKey("CategoryId")]
        public ContactCategory? Category { get; set; }
    }
}
