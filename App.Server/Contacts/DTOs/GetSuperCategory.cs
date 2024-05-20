namespace App.Server.Contacts.DTOs
{
    public class GetSuperCategory
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<GetSuperCategory> SubCategories { get; set; } = new List<GetSuperCategory>();
    }
}
