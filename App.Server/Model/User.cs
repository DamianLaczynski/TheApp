using App.Server.Chats.Model;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace StudyBookAPI.Entities
{
    public class User : IdentityUser
    {
        [PersonalData]
        public string? Firstname { get; set; }

        [PersonalData]
        public string? Surname { get; set; }

        [PersonalData]
        public DateOnly? DateOfBirth { get; set; }

        [PersonalData]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [PersonalData]
        public bool IsDeleted { get; set; } = false;

        public List<UserChatRoom> UserChatRooms  { get; set; } = new List<UserChatRoom>();
    }
}
