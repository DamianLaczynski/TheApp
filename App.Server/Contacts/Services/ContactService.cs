using App.Exceptions;
using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace App.Server.Contacts.Services
{
    public class ContactService : IContactService
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ContactService(AppDbContext dbContext, IMapper mapper)
        {
            _context = dbContext;
            _mapper = mapper;
        }

        public async Task<T> Create<T>(CreateContactRequest dto) where T : IContact
        {
            var category = _context.ContactCategories.FirstOrDefault(c => c.Id == dto.CategoryId);
            if (category == null)
            {
                throw new NotFoundException("Category not found");
            }
            var contact = _mapper.Map<Contact>(dto);
            contact.Category = category;

            _context.Add(contact);
            await _context.SaveChangesAsync();
            return _mapper.Map<T>(contact);
        }

        /// <summary>
        /// Get contact by id
        /// </summary>
        /// <typeparam name="T">Must extend IContact interface</typeparam>
        /// <param name="id">Contact id</param>
        /// <returns>Contact of given id</returns>
        /// <exception cref="NotFoundException"></exception>
        public async Task<T> GetById<T>(string id) where T : IContact
        {
            var contact = await _context.Contacts
                //.Include(c => c.Role)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (contact == null)
            {
                throw new NotFoundException();
            }

            return _mapper.Map<T>(contact);
        }

        /// <summary>
        /// Get all contacts
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns>List of all contacts</returns>
        public async Task<IEnumerable<T>> GetAll<T>() where T : IContact
        {
            var contacts = await _context.Contacts
                .Include(c => c.Category).ThenInclude(cat => cat.SuperCategory)
                .ToListAsync();

            return _mapper.Map<List<T>>(contacts);
        }

        /// <summary>
        /// Update contact
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <param name="updateDto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<T> Update<T>(string id, UpdateContactRequest updateDto) where T : IContact
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Delete contact
        /// </summary>
        /// <param name="id">Contact id</param>
        /// <returns>True when deteted successfully</returns>
        /// <exception cref="NotFoundException"></exception>
        public async Task<bool> Delete(string id)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            if (contact == null)
            {
                throw new NotFoundException();
            }

            _context.Contacts.Remove(contact);
            _context.SaveChanges();
            return true;
        }
    }
}
