using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;

namespace App.Server.Contacts.Services
{
    /// <summary>
    /// Interface for the contact category service, defining methods for managing contact categories.
    /// </summary>
    public interface IContactCategoryService
    {
        /// <summary>
        /// Retrieves a contact category by its identifier.
        /// </summary>
        /// <typeparam name="T">The type of the contact category to retrieve.</typeparam>
        /// <param name="id">The identifier of the contact category to retrieve.</param>
        /// <returns>A task that represents the asynchronous get operation. The task result contains the contact category with the specified identifier.</returns>
        Task<T> GetCategoryAsync<T>(string id);

        /// <summary>
        /// Retrieves all contact categories.
        /// </summary>
        /// <typeparam name="T">The type of the contact categories to retrieve.</typeparam>
        /// <returns>A task that represents the asynchronous get operation. The task result contains a collection of contact categories.</returns>
        Task<IEnumerable<T>> GetCategoriesAsync<T>();

        /// <summary>
        /// Creates a new subcategory using the provided create request.
        /// </summary>
        /// <typeparam name="T">The type of the subcategory to create.</typeparam>
        /// <param name="category">The create request containing the subcategory information.</param>
        /// <returns>A task that represents the asynchronous create operation. The task result contains the created subcategory.</returns>
        Task<T> CreateSubcategoryAsync<T>(CreateContactCategoryRequest category);
    }
}