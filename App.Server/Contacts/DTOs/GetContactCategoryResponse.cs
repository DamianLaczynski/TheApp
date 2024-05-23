namespace App.Server.Contacts.DTOs
{
    public class GetContactCategoryResponse
    {
        /// <summary>
        /// Gets or sets the unique identifier for the contact category.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the contact category.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the super category of the contact category.
        /// </summary>
        public GetContactCategoryResponse? SuperCategory { get; set; }
    }
}
