using System.ComponentModel.DataAnnotations;

namespace App.Server.Contacts.DTOs
{
    public class CreateContactCategoryRequest
    {
        /// <summary>
        /// Gets or sets the name of the contact category.
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the identifier of the parent category.
        /// </summary>
        [Required]
        public string SuperCategoryId { get; set; }
    }
}