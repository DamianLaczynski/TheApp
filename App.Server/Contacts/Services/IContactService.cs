using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;

namespace App.Server.Contacts.Services
{
    /// <summary>
    /// Interface for the contact service, defining methods for managing contacts.
    /// </summary>
    public interface IContactService
    {
        /// <summary>
        /// Deletes a contact by its identifier.
        /// </summary>
        /// <param name="id">The identifier of the contact to delete.</param>
        /// <returns>A task that represents the asynchronous delete operation. The task result contains a boolean indicating whether the deletion was successful.</returns>
        Task<bool> Delete(string id);

        /// <summary>
        /// Updates a contact with the specified identifier using the provided update request.
        /// </summary>
        /// <typeparam name="T">The type of the contact to update.</typeparam>
        /// <param name="id">The identifier of the contact to update.</param>
        /// <param name="updateRequest">The update request containing the updated contact information.</param>
        /// <returns>A task that represents the asynchronous update operation. The task result contains the updated contact.</returns>
        Task<T> Update<T>(string id, UpdateContactRequest updateRequest) where T : IContact;

        /// <summary>
        /// Retrieves all contacts.
        /// </summary>
        /// <typeparam name="T">The type of the contacts to retrieve.</typeparam>
        /// <returns>A task that represents the asynchronous get operation. The task result contains a collection of contacts.</returns>
        Task<IEnumerable<T>> GetAll<T>() where T : IContact;

        /// <summary>
        /// Retrieves a contact by its identifier.
        /// </summary>
        /// <typeparam name="T">The type of the contact to retrieve.</typeparam>
        /// <param name="id">The identifier of the contact to retrieve.</param>
        /// <returns>A task that represents the asynchronous get operation. The task result contains the contact with the specified identifier.</returns>
        Task<T> GetById<T>(string id) where T : IContact;

        /// <summary>
        /// Creates a new contact using the provided create request.
        /// </summary>
        /// <typeparam name="T">The type of the contact to create.</typeparam>
        /// <param name="createContactRequest">The create request containing the contact information.</param>
        /// <returns>A task that represents the asynchronous create operation. The task result contains the created contact.</returns>
        Task<T> Create<T>(CreateContactRequest createContactRequest) where T : IContact;
    }

}