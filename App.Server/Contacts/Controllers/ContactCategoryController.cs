using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;
using App.Server.Contacts.Services;
using Microsoft.AspNetCore.Mvc;

namespace App.Server.Contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactCategoryController : ControllerBase
    {
        private IContactCategoryService _contactCategoryService;
        public ContactCategoryController(IContactCategoryService contactCategoryService) 
        {
            _contactCategoryService = contactCategoryService;
        }

        /// <summary>
        /// Get contact category async
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<GetContactCategoryDto> GetAsync([FromRoute] string id)
        {
            return await _contactCategoryService.GetCategoryAsync<GetContactCategoryDto>(id);
        }

        /// <summary>
        /// Get all contact categories async
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<GetSuperCategory>> GetAllAsync()
        {
            return await _contactCategoryService.GetContactCategoriesAsync<GetSuperCategory>();
        }

        /// <summary>
        /// Create contact category async
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<GetContactCategoryDto> CreateAsync([FromBody] CreateContactCategoryDto dto)
        {
            return await _contactCategoryService.CreateAsync< GetContactCategoryDto>(dto);
        }
    }
}
