using App.Server.Contacts.Models;
using System.ComponentModel.DataAnnotations;

namespace App.Server.Contacts.DTOs
{
    public class CreateContactRequest : IContact
    {
        /// <summary>
        /// Gets or sets the first name of the contact.
        /// </summary>
        [Required]
        public string Firstname { get; set; }

        /// <summary>
        /// Gets or sets the last name of the contact.
        /// </summary>
        [Required]
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
        [RegularExpression("[0-9]{9}", ErrorMessage = "Phone must be numeric and have 9 digits")]
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Gets or sets the birthday of the contact.
        /// </summary>
        public DateOnly? Birthday { get; set; }

        /// <summary>
        /// Gets or sets the identifier of the category for the contact.
        /// </summary>
        public string? CategoryId { get; set; }
    }
}
