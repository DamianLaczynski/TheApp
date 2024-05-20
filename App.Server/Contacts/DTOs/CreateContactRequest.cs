using App.Server.Contacts.Models;

namespace App.Server.Contacts.DTOs
{
    public class CreateContactRequest : IContact
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly? Birthday { get; set; }
        public string? CategoryId { get; set; }
    }
}
