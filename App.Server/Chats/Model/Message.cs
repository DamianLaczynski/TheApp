using StudyBookAPI.Entities;

namespace App.Server.Chats.Model
{
    public class Message
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime Timestamp { get; set; }
        public string SenderId { get; set; }
        public User Sender { get; set; }

        public string ChatRoomId { get; set; }
        public ChatRoom ChatRoom { get; set; }
    }
}
