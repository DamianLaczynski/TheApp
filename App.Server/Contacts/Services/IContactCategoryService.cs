using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;

namespace App.Server.Contacts.Services
{
    public interface IContactCategoryService
    {
        Task<T> GetCategoryAsync<T>(string id);
        Task<IEnumerable<T>> GetContactCategoriesAsync<T>();
        Task<T> CreateAsync<T>(CreateContactCategoryDto category);
    }
}