using App.Exceptions;
using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace App.Server.Contacts.Services
{
    /// <summary>
    /// Service for managing contacts.
    /// </summary>
    public class ContactService : IContactService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContactService"/> class.
        /// </summary>
        /// <param name="dbContext">The database context.</param>
        /// <param name="mapper">The AutoMapper instance.</param>
        public ContactService(AppDbContext dbContext, IMapper mapper)
        {
            _context = dbContext;
            _mapper = mapper;
        }

        /// <summary>
        /// Creates a new contact.
        /// </summary>
        /// <typeparam name="T">The type of the contact to create.</typeparam>
        /// <param name="createContactRequest">The create contact request.</param>
        /// <returns>The created contact.</returns>
        /// <exception cref="BadRequestException">Thrown when the email is duplicated.</exception>
        /// <exception cref="NotFoundException">Thrown when the category from the request does not exist.</exception>
        public async Task<T> Create<T>(CreateContactRequest createContactRequest) where T : IContact
        {
            if (_context.Contacts.Any(c => c.Email == createContactRequest.Email))
            {
                throw new BadRequestException("Email must be unique.");
            }

            if (string.IsNullOrEmpty(createContactRequest.CategoryId))
            {
                createContactRequest.CategoryId = null;
            }

            var contact = _mapper.Map<Contact>(createContactRequest);

            if (!string.IsNullOrEmpty(createContactRequest.CategoryId))
            {
                var category = _context.ContactCategories.FirstOrDefault(c => c.Id == createContactRequest.CategoryId);
                if (category == null)
                {
                    throw new NotFoundException("Category not found.");
                }

                contact.Category = category;
            }

            _context.Add(contact);
            await _context.SaveChangesAsync();
            return _mapper.Map<T>(contact);
        }

        /// <summary>
        /// Retrieves a contact by its identifier.
        /// </summary>
        /// <typeparam name="T">The type of the contact to retrieve.</typeparam>
        /// <param name="id">The identifier of the contact.</param>
        /// <returns>The contact with the specified identifier.</returns>
        /// <exception cref="NotFoundException">Thrown when a contact with the specified identifier is not found.</exception>
        public async Task<T> GetById<T>(string id) where T : IContact
        {
            var contact = await _context.Contacts
                .Include(c => c.Category).ThenInclude(category => category.SuperCategory)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (contact == null)
            {
                throw new NotFoundException();
            }

            return _mapper.Map<T>(contact);
        }

        /// <summary>
        /// Retrieves all contacts.
        /// </summary>
        /// <typeparam name="T">The type of the contacts to retrieve.</typeparam>
        /// <returns>A list of all contacts.</returns>
        public async Task<IEnumerable<T>> GetAll<T>() where T : IContact
        {
            var contacts = await _context.Contacts
                .Include(c => c.Category).ThenInclude(category => category.SuperCategory)
                .ToListAsync();

            return _mapper.Map<List<T>>(contacts);
        }

        /// <summary>
        /// Updates a contact with the specified identifier.
        /// </summary>
        /// <typeparam name="T">The type of the contact to update.</typeparam>
        /// <param name="id">The identifier of the contact.</param>
        /// <param name="updateDto">The update contact request.</param>
        /// <returns>The updated contact.</returns>
        /// <exception cref="NotFoundException">Thrown when a contact with the specified identifier is not found.</exception>
        /// <exception cref="BadRequestException">Thrown when the email is duplicated.</exception>
        public async Task<T> Update<T>(string id, UpdateContactRequest updateDto) where T : IContact
        {
            var contact = _context.Contacts.FirstOrDefault(x => x.Id == id);

            if (contact == null)
            {
                throw new NotFoundException($"Contact with id {id} not found.");
            }

            if (_context.Contacts.Any(c => c.Email == updateDto.Email) && contact.Email != updateDto.Email)
            {
                throw new BadRequestException("Email must be unique.");
            }

            contact.Firstname = updateDto.Firstname ?? contact.Firstname;
            contact.Lastname = updateDto.Lastname ?? contact.Lastname;
            contact.Email = updateDto.Email ?? contact.Email;
            contact.Birthday = updateDto.Birthday;
            contact.PhoneNumber = updateDto.PhoneNumber;

            if (!string.IsNullOrEmpty(updateDto.CategoryId))
            {
                var category = _context.ContactCategories
                    .Where(c => c.Id == updateDto.CategoryId)
                    .Include(c => c.SuperCategory)
                    .FirstOrDefault();

                if (category == null)
                {
                    throw new NotFoundException("Category not found.");
                }

                contact.Category = category;
            }

            await _context.SaveChangesAsync();
            return _mapper.Map<T>(contact);
        }

        /// <summary>
        /// Deletes a contact with the specified identifier.
        /// </summary>
        /// <param name="id">The identifier of the contact.</param>
        /// <returns>A boolean indicating whether the deletion was successful.</returns>
        /// <exception cref="NotFoundException">Thrown when a contact with the specified identifier is not found.</exception>
        public async Task<bool> Delete(string id)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            if (contact == null)
            {
                throw new NotFoundException();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}