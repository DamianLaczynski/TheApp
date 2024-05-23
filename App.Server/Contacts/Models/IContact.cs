using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace App.Server.Contacts.Models
{
    /// <summary>
    /// Interface representing a contact.
    /// </summary>
    public interface IContact
    {
        /// <summary>
        /// Gets or sets the first name of the contact.
        /// </summary>
        string Firstname { get; set; }

        /// <summary>
        /// Gets or sets the last name of the contact.
        /// </summary>
        string Lastname { get; set; }
    }
}