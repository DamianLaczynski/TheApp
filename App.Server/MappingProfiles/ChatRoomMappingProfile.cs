using AutoMapper;

namespace App.Server.MappingProfiles
{
    public class ChatRoomMappingProfile : Profile
    {
        public ChatRoomMappingProfile()
        {
            CreateMap<Chats.Model.ChatRoom, Chats.DTOs.GetRoomResponse>()
                .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.UserChatRooms.Select(ucr => ucr.User)));
            CreateMap<Chats.DTOs.CreateRoomRequest, Chats.Model.ChatRoom>();
            CreateMap<Chats.DTOs.UpdateRoomRequest, Chats.Model.ChatRoom>();
        }
    }
}
