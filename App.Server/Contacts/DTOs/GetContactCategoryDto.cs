namespace App.Server.Contacts.DTOs
{
    public class GetContactCategoryDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public GetContactCategoryDto? SuperCategory { get; set; }
    }
}
