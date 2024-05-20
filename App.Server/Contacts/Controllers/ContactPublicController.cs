using App.Server.Contacts.DTOs;
using App.Server.Contacts.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.Server.Contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactPublicController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactPublicController(IContactService contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// Get all public contacts
        /// </summary>
        /// <returns>List of public information about contacts</returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<GetPublicContactDto>> GetAll()
        {
            return await _contactService.GetAll<GetPublicContactDto>();
        }

        /// <summary>
        /// Get public contact by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Public informations about given contact</returns>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<GetPublicContactDto> Get([FromRoute] string id)
        {
            return await _contactService.GetById<GetPublicContactDto>(id);
        }
    }
}
