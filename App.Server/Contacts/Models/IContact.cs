using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace App.Server.Contacts.Models
{
    public interface IContact
    {
        string Firstname { get; set; }

        string Lastname { get; set; }

    }
}