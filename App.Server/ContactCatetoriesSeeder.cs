using App.Server.Contacts.Models;

namespace App.Server
{
    public class ContactCatetoriesSeeder
    {
        private readonly AppDbContext _context;

        public ContactCatetoriesSeeder(AppDbContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if(_context.Database.CanConnect())
            {
                if(!_context.ContactCategories.Any())
                {
                    var contactCategories = GetContactCategories();
                    _context.ContactCategories.AddRange(contactCategories);
                    _context.SaveChanges();
                }
            }
        }

        private IEnumerable<ContactCategory> GetContactCategories()
        {
            var contactCategories = new List<ContactCategory>()
            {
                new ContactCategory()
                {
                    Name = "Słuźbowy",
                    SuperCategory = null,
                    Id = "sluzbowy"

                },
                new ContactCategory()
                {
                    Name = "Prywatny",
                    SuperCategory = null,
                    Id = "prywatny"
                },
                new ContactCategory()
                {
                    Name = "Inny",
                    SuperCategory = null,
                    Id = "inny"
                },
                new ContactCategory()
                {
                    Name = "Szef",
                    SuperCategory = null,
                    Id = "szef",
                    SuperCategoryId = "sluzbowy"
                },
                new ContactCategory()
                {
                    Name = "Klient",
                    SuperCategory = null,
                    Id = "klient",
                    SuperCategoryId = "sluzbowy"
                },
            };
            return contactCategories;
        }
    }
}
