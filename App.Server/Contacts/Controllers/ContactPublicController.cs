using App.Server.Contacts.DTOs;
using App.Server.Contacts.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.Server.Contacts.Controllers
{
    /// <summary>
    /// Controller for unauthorized requests of getting contacts 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ContactPublicController : ControllerBase
    {
        private readonly IContactService _contactService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContactPublicController"/> class.
        /// </summary>
        /// <param name="contactService">The contact service.</param>
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
        public async Task<IEnumerable<GetPublicContactResponse>> GetAll()
        {
            return await _contactService.GetAll<GetPublicContactResponse>();
        }

        /// <summary>
        /// Get public contact by id
        /// </summary>
        /// <param name="id">Contact id</param>
        /// <returns>Public information about given contact</returns>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<GetPublicContactResponse> Get([FromRoute] string id)
        {
            return await _contactService.GetById<GetPublicContactResponse>(id);
        }
    }
}