namespace App.Server.DTOs
{
    public class GetTaskResponse
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public DateTime? Deadline { get; set; }

        public string? Status { get; set; } = string.Empty;

        public string? Priority { get; set; } = string.Empty;

    }
}
