using App.Exceptions;
using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;
using App.Server.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace App.Server.Contacts.Services
{
    public class ContactCategoryService : IContactCategoryService
    {
        private readonly IMapper mapper;
        private readonly AppDbContext _context;
        public ContactCategoryService(AppDbContext dbContext, IMapper mapper )
        {
            this._context = dbContext;
            this.mapper = mapper;
        }

        public async Task<T> CreateAsync<T>(CreateContactCategoryDto category)
        {
            var superCategory = _context.ContactCategories.FirstOrDefault(c => c.Id == category.SuperCategoryId);

            if (superCategory == null)
            {
                throw new NotFoundException("Not found superCategory of id:" + category.SuperCategoryId);
            }

            var newCategory = mapper.Map<ContactCategory>(category);

            _context.ContactCategories.Add(newCategory);
            await _context.SaveChangesAsync();

            return mapper.Map<T>(newCategory);
        }

        public Task<T> GetCategoryAsync<T>(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> GetContactCategoriesAsync<T>()
        {
            var categories = await _context.ContactCategories.Where(c => c.SuperCategoryId == null)
                .Include(c => c.SubCategories)
                .ToListAsync();

            if(categories == null)
            {
                throw new NoContentException();
            }

            return mapper.Map<IEnumerable<T>>(categories);
        }
    }
}
