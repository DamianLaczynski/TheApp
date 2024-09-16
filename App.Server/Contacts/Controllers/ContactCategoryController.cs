using App.Server.Contacts.DTOs;
using App.Server.Contacts.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.Server.Contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactCategoryController : ControllerBase
    {
        private readonly IContactCategoryService _contactCategoryService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContactCategoryController"/> class.
        /// </summary>
        /// <param name="contactCategoryService">The contact category service.</param>
        public ContactCategoryController(IContactCategoryService contactCategoryService)
        {
            _contactCategoryService = contactCategoryService;
        }

        /// <summary>
        /// Get contact category asynchronously.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>Category of given id as child node.</returns>
        [HttpGet("{id}")]
        public async Task<GetContactCategoryResponse> GetAsync([FromRoute] string id)
        {
            return await _contactCategoryService.GetCategoryAsync<GetContactCategoryResponse>(id);
        }

        /// <summary>
        /// Get all contact categories asynchronously.
        /// </summary>
        /// <returns>List of contacts as trees.</returns>
        [HttpGet]
        public async Task<IEnumerable<GetSuperCategoryResponse>> GetAllAsync()
        {
            return await _contactCategoryService.GetCategoriesAsync<GetSuperCategoryResponse>();
        }

        /// <summary>
        /// Create contact subcategory asynchronously.
        /// </summary>
        /// <param name="dto">The DTO.</param>
        /// <returns>Created subcategory as child.</returns>
        [HttpPost]
        [Authorize]
        public async Task<GetContactCategoryResponse> CreateSubcategoryAsync([FromBody] CreateContactCategoryRequest dto)
        {
            return await _contactCategoryService.CreateSubcategoryAsync<GetContactCategoryResponse>(dto);
        }
    }
}
