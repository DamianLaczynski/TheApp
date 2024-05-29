using App.Server.Chats.DTOs;
using App.Server.Chats.Model;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace App.Server.Chats
{
    public interface IChatRoomService
    {
        public GetRoomResponse CreateRoomAsync(CreateRoomRequest request);
        public Task<GetRoomResponse> GetRoomAsync(string roomId);
        public Task<List<GetRoomResponse>> GetRoomsAsync();
        public Task<GetRoomResponse> UpdateRoomAsync(string roomId, UpdateRoomRequest request);
        public Task<bool> DeleteRoomAsync(string roomId);
    }

    public class ChatRoomService : IChatRoomService
    {
        private readonly AppDbContext _dbContext;
        private readonly ILogger<ChatRoomService> _logger;
        private readonly IMapper _mapper;

        public ChatRoomService(AppDbContext appDbContext, ILogger<ChatRoomService> logger, IMapper mapper)
        {
            _dbContext = appDbContext;
            _logger = logger;
            _mapper = mapper;
        }

        public GetRoomResponse CreateRoomAsync(CreateRoomRequest request)
        {
            var room = new ChatRoom
            {
                Name = request.Name,
                UserChatRooms = new List<UserChatRoom>(),
                Messages = new List<Message>()
            };

            foreach (var userId in request.UserIds)
            {
                var user = _dbContext.Users.Find(userId);
                if (user == null)
                {
                    throw new Exception($"User with id {userId} not found");
                }

                var userChatRoom = new UserChatRoom
                {
                    UserId = userId,
                    ChatRoomId = room.Id
                };

                room.UserChatRooms.Add(userChatRoom);
            }

            _dbContext.ChatRooms.Add(room);

            _dbContext.SaveChanges();

            return _mapper.Map<GetRoomResponse>(room);
        }

        public Task<bool> DeleteRoomAsync(string roomId)
        {
            throw new NotImplementedException();
        }

        public async Task<GetRoomResponse> GetRoomAsync(string roomId)
        {
            var room = await _dbContext.ChatRooms.FindAsync(roomId);
            if (room == null)
            {
                throw new Exception($"Room with id {roomId} not found");
            }
            var userChatRooms = _dbContext.UserChatRooms
                .Where(ucr => ucr.ChatRoomId == room.Id)
                .ToList();

            foreach(var userChatRoom in userChatRooms)
            {
                userChatRoom.User = _dbContext.Users.Find(userChatRoom.UserId);
            }
            
            room.UserChatRooms = userChatRooms;
            return _mapper.Map<GetRoomResponse>(room);
        }

        public async Task<List<GetRoomResponse>> GetRoomsAsync()
        {
            var rooms = await _dbContext.ChatRooms.ToListAsync();

            return _mapper.Map<List<GetRoomResponse>>(rooms);
        }

        public async Task<GetRoomResponse> UpdateRoomAsync(string roomId, UpdateRoomRequest request)
        {
            var room = await _dbContext.ChatRooms.FindAsync(roomId);
            if (room == null)
            {
                throw new Exception($"Room with id {roomId} not found");
            }

            return new GetRoomResponse
            {
                Id = room.Id,
                Name = room.Name,
                //Users = room.UserChatRooms.Select(x => x.User).ToList(),
                Messages = room.Messages
            };
        }
    }
}
