using StudyBookAPI.Entities;

namespace App.Server.Chats.Model
{
    public class ChatRoom
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public List<UserChatRoom> UserChatRooms { get; set; }
        public List<Message> Messages { get; set; } = new List<Message>();
    }
}
