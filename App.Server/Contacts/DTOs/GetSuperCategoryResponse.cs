namespace App.Server.Contacts.DTOs
{
    public class GetSuperCategoryResponse
    {
        /// <summary>
        /// Gets or sets the unique identifier for the category.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the category.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the subcategories of the category.
        /// </summary>
        public List<GetSuperCategoryResponse> SubCategories { get; set; } = new List<GetSuperCategoryResponse>();
    }
}
