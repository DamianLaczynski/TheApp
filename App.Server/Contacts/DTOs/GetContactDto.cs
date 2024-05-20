using App.Server.Contacts.Models;

namespace App.Server.Contacts.DTOs
{
    public class GetContactDto : IContact
    {
        public string Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly? Birthday { get; set; }
        public GetContactCategoryDto? Category { get; set; }
    }
}
