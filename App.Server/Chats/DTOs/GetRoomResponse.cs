using App.Server.Chats.Model;
using App.Server.DTOs;
using StudyBookAPI.Entities;

namespace App.Server.Chats.DTOs
{
    public class GetRoomResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<GetPublicUserResponse> Users { get; set; }
        public List<Message> Messages { get; set; }
    }
}
