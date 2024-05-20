using App.Server.Contacts.Models;

namespace App.Server.Contacts.DTOs
{
    public class UpdateContactRequest : IContact
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }
}
