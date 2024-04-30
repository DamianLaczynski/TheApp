using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace StudyBookAPI.Entities
{
    public class User : IdentityUser
    {
        public string? Firstname { get; set; }

        public string? Surname { get; set; }

        public DateOnly? DateOfBirth { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsDeleted { get; set; } = false;
    }
}
