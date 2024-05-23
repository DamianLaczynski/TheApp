using App.Server.Contacts.Models;

namespace App.Server.Contacts.DTOs
{
    public class GetPublicContactResponse : IContact
    {
        /// <summary>
        /// Gets or sets the first name of the contact.
        /// </summary>
        public string Firstname { get; set; }

        /// <summary>
        /// Gets or sets the last name of the contact.
        /// </summary>
        public string Lastname { get; set; }
    }
}
