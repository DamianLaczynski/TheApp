using StudyBookAPI.Entities;

namespace App.Server.Chats.Model
{
    public class UserChatRoom
    {
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public bool IsMuted { get; set; } = false;

        public string UserId { get; set; }
        public User User { get; set; }

        public string ChatRoomId { get; set; }
        public ChatRoom ChatRoom { get; set; }
    }
}