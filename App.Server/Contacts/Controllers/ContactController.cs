using App.Exceptions;
using App.Server.Contacts.DTOs;
using App.Server.Contacts.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.Server.Contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContactController"/> class.
        /// </summary>
        /// <param name="contactService">The contact service.</param>
        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// Create contact asynchronously.
        /// </summary>
        /// <param name="dto">Dto of new contact.</param>
        /// <returns>Created contact.</returns>
        [HttpPost]
        public async Task<GetContactResponse> CreateAsync([FromBody] CreateContactRequest dto)
        {
            if (!ModelState.IsValid)
            {
                throw new BadRequestException(ModelState.ToString());
            }

            return await _contactService.Create<GetContactResponse>(dto);
        }

        /// <summary>
        /// Get all contacts asynchronously.
        /// </summary>
        /// <returns>List of all contacts.</returns>
        [HttpGet]
        public async Task<IEnumerable<GetContactResponse>> GetAllAsync()
        {
            return await _contactService.GetAll<GetContactResponse>();
        }

        /// <summary>
        /// Get contact asynchronously by id.
        /// </summary>
        /// <param name="id">Contact id.</param>
        /// <returns>Contact of given id.</returns>
        [HttpGet("{id}")]
        public async Task<GetContactResponse> GetAsync([FromRoute] string id)
        {
            return await _contactService.GetById<GetContactResponse>(id);
        }

        /// <summary>
        /// Update contact asynchronously.
        /// </summary>
        /// <param name="updateContactRequest">Dto of updated contact.</param>
        /// <param name="id">Contact id.</param>
        /// <returns>Updated contact.</returns>
        [HttpPatch("{id}")]
        public async Task<GetContactResponse> UpdateAsync([FromBody] UpdateContactRequest updateContactRequest, [FromRoute] string id)
        {
            return await _contactService.Update<GetContactResponse>(id, updateContactRequest);
        }

        /// <summary>
        /// Delete contact asynchronously.
        /// </summary>
        /// <param name="id">Contact id.</param>
        /// <returns>true - delete successfully, false - delete failed.</returns>
        [HttpDelete("{id}")]
        public async Task<bool> DeleteAsync([FromRoute] string id)
        {
            return await _contactService.Delete(id);
        }
    }
}