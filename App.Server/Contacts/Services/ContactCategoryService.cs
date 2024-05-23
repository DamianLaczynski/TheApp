using App.Exceptions;
using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;
using App.Server.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace App.Server.Contacts.Services
{
    /// <summary>
    /// Service for managing contact categories.
    /// </summary>
    public class ContactCategoryService : IContactCategoryService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContactCategoryService"/> class.
        /// </summary>
        /// <param name="dbContext">The database context.</param>
        /// <param name="mapper">The AutoMapper instance.</param>
        public ContactCategoryService(AppDbContext dbContext, IMapper mapper)
        {
            _context = dbContext;
            _mapper = mapper;
        }

        /// <summary>
        /// Creates a new subcategory.
        /// </summary>
        /// <typeparam name="T">The type of the subcategory to create.</typeparam>
        /// <param name="category">The create subcategory request.</param>
        /// <returns>The created subcategory.</returns>
        /// <exception cref="NotFoundException">Thrown when the supercategory with the specified identifier is not found.</exception>
        public async Task<T> CreateSubcategoryAsync<T>(CreateContactCategoryRequest category)
        {
            // Check if the supercategory exists
            var superCategory = await _context.ContactCategories.FirstOrDefaultAsync(c => c.Id == category.SuperCategoryId);

            if (superCategory == null)
            {
                throw new NotFoundException("SuperCategory not found with id: " + category.SuperCategoryId);
            }

            var newCategory = _mapper.Map<ContactCategory>(category);

            _context.ContactCategories.Add(newCategory);
            await _context.SaveChangesAsync();

            return _mapper.Map<T>(newCategory);
        }

        /// <summary>
        /// Retrieves a contact category by its identifier.
        /// </summary>
        /// <typeparam name="T">The type of the contact category to retrieve.</typeparam>
        /// <param name="id">The identifier of the contact category.</param>
        /// <returns>The contact category with the specified identifier.</returns>
        /// <exception cref="NotImplementedException">This method is not yet implemented.</exception>
        public Task<T> GetCategoryAsync<T>(string id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Retrieves all contact categories.
        /// </summary>
        /// <typeparam name="T">The type of the contact categories to retrieve.</typeparam>
        /// <returns>A list of all contact categories.</returns>
        /// <exception cref="NoContentException">Thrown when no categories are found.</exception>
        public async Task<IEnumerable<T>> GetCategoriesAsync<T>()
        {
            var categories = await _context.ContactCategories
                .Where(c => c.SuperCategoryId == null)
                .Include(c => c.SubCategories)
                .ToListAsync();

            if (categories == null || !categories.Any())
            {
                throw new NoContentException();
            }

            return _mapper.Map<IEnumerable<T>>(categories);
        }
    }
}