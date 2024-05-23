using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;
using AutoMapper;

namespace App.Server.Contacts.MappingProfiles
{
    /// <summary>
    /// Mapping profile for contacts.
    /// </summary>
    public class ContactMappingProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ContactMappingProfile"/> class.
        /// </summary>
        public ContactMappingProfile()
        {
            CreateMap<Contact, GetContactResponse>();
            CreateMap<Contact, GetPublicContactResponse>();
            CreateMap<CreateContactRequest, Contact>();

            CreateMap<CreateContactCategoryRequest, ContactCategory>();
            CreateMap<ContactCategory, GetSuperCategoryResponse>()
                .ForMember(c => c.SubCategories, opt => opt.MapFrom(src => src.SubCategories));
            CreateMap<ContactCategory, GetContactCategoryResponse>();
        }
    }
}
