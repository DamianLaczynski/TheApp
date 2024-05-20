using System.ComponentModel.DataAnnotations;

namespace App.Server.Contacts.Models
{
    public class ContactCategory
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string? SuperCategoryId { get; set; }
        public ContactCategory? SuperCategory { get; set; }
        public List<ContactCategory> SubCategories { get; set; } = new List<ContactCategory>();

        public List<Contact> Contacts { get; set; } = new List<Contact>();
    }
}
