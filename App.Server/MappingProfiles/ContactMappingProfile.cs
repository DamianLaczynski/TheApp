using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;
using AutoMapper;

namespace App.Server.MappingProfiles
{
    public class ContactMappingProfile : Profile
    {
        public ContactMappingProfile() 
        {
            CreateMap<Contact, GetContactDto>();
            CreateMap<Contact, GetPublicContactDto>();
            CreateMap<CreateContactRequest, Contact>();

            CreateMap<CreateContactCategoryDto, ContactCategory>();
            CreateMap<ContactCategory, GetSuperCategory>().ForMember(c => c.SubCategories, opt => opt.MapFrom(src => src.SubCategories));
            CreateMap<ContactCategory, GetContactCategoryDto>();

        }
    }
}
    