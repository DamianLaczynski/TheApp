using App.Server.Contacts.DTOs;
using App.Server.Contacts.Models;

namespace App.Server.Contacts.Services
{
    public interface IContactService
    {
        Task<bool> Delete(string id);
        Task<T> Update<T>(string id, UpdateContactRequest updateRequest) where T : IContact;
        Task<IEnumerable<T>> GetAll<T>() where T : IContact;
        Task<T> GetById<T>(string id) where T : IContact;
        Task<T> Create<T>(CreateContactRequest dto) where T : IContact;
    }
}