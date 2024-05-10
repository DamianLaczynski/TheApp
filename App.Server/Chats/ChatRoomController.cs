using App.Server.Chats.DTOs;
using Microsoft.AspNetCore.Mvc;
using StudyBookAPI.Entities;

namespace App.Server.Chats
{
    [Route("api/chat-rooms")]
    [ApiController]
    public class ChatRoomController : ControllerBase
    {
        private readonly IChatRoomService _chatRoomService;
        private readonly AppDbContext _appDbContext;

        public ChatRoomController(IChatRoomService chatRoomService, AppDbContext appDbContext)
        {
            _chatRoomService = chatRoomService;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<List<GetRoomResponse>> GetChatRooms()
        {
            
            return await _chatRoomService.GetRoomsAsync();
        }

        [HttpGet("{id}")]
        public async Task<GetRoomResponse> GetChatRoom(string id)
        {
            return await _chatRoomService.GetRoomAsync(id);
        }

        [HttpPost]
        public GetRoomResponse CreateChatRoom(CreateRoomRequest createRoomRequest)
        {
            
            return _chatRoomService.CreateRoomAsync(createRoomRequest);
        }

        [HttpPut("{id}")]
        public async Task<GetRoomResponse> UpdateChatRoom(string id, UpdateRoomRequest updateRoomRequest)
        {
            return await _chatRoomService.UpdateRoomAsync(id, updateRoomRequest);
        }

        [HttpDelete("{id}")]
        public async Task<bool> DeleteChatRoom(string id)
        {
            return await _chatRoomService.DeleteRoomAsync(id);
        }

        [HttpPost("{id}/users")]
        public ActionResult<List<User>> GetUsers()
        {
            return _appDbContext.Users.ToList();
        }


    }
}
