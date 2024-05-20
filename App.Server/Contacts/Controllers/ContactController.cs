using App.Server.Contacts.DTOs;
using App.Server.Contacts.Services;
using Microsoft.AspNetCore.Mvc;

namespace App.Server.Contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// Create contact async
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<GetContactDto> CreateAsync([FromBody] CreateContactRequest dto)
        {
            return await _contactService.Create<GetContactDto>(dto);
        }

        /// <summary>
        /// Get all contacts async
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<GetContactDto>> GetAllAsync()
        {
            return await _contactService.GetAll<GetContactDto>();
        }

        /// <summary>
        /// Get contact async by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<GetContactDto> GetAsync([FromRoute] string id)
        {
            return await _contactService.GetById<GetContactDto>(id);
        }

        /// <summary>
        /// Update contact async
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<GetContactDto> UpdateAsync([FromBody] UpdateContactRequest dto, [FromRoute] string id)
        {
            return await _contactService.Update<GetContactDto>(id, dto);
        }

        /// <summary>
        /// Delete contact async
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<bool> DeleteAsync([FromRoute] string id)
        {
            return await _contactService.Delete(id);
        }
    }
}
