using App.Server.DTOs;
using AutoMapper;
using StudyBookAPI.Entities;

namespace App.Server.MappingProfiles
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, GetPublicUserResponse>();
        }
    }
}
