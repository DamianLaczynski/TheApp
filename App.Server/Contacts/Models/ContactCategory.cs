using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Server.Contacts.Models
{
    /// <summary>
    /// Represents a contact category entity.
    /// </summary>
    public class ContactCategory
    {
        /// <summary>
        /// Gets or sets the unique identifier for the contact category.
        /// </summary>
        [Required]
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the contact category.
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the identifier of the parent category.
        /// </summary>
        public string? SuperCategoryId { get; set; }

        /// <summary>
        /// Gets or sets the parent category of the contact category.
        /// </summary>
        [ForeignKey("SuperCategoryId")]
        public ContactCategory? SuperCategory { get; set; }

        /// <summary>
        /// Gets or sets the subcategories of the contact category.
        /// </summary>
        public List<ContactCategory> SubCategories { get; set; } = new List<ContactCategory>();

        /// <summary>
        /// Gets or sets the contacts associated with the contact category.
        /// </summary>
        public List<Contact> Contacts { get; set; } = new List<Contact>();
    }
}
