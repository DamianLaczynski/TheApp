using App.Server.Contacts.Models;

namespace App.Server.Contacts.DTOs
{
    public class GetContactResponse : IContact
    {
        /// <summary>
        /// Gets or sets the unique identifier for the contact.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the first name of the contact.
        /// </summary>
        public string Firstname { get; set; }

        /// <summary>
        /// Gets or sets the last name of the contact.
        /// </summary>
        public string Lastname { get; set; }

        /// <summary>
        /// Gets or sets the email of the contact.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the phone number of the contact.
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Gets or sets the birthday of the contact.
        /// </summary>
        public DateOnly? Birthday { get; set; }

        /// <summary>
        /// Gets or sets the category of the contact.
        /// </summary>
        public GetContactCategoryResponse? Category { get; set; }
    }
}
