namespace App.Server.Chats.DTOs
{
    public class CreateRoomRequest
    {
        public string Name { get; set; }
        
        public List<string> UserIds { get; set; }
    }
}
