namespace App.Server.DTOs
{
    public class UpdateTaskRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; }

        public string Priority { get; set; }

        public DateTime? Deadline { get; set; }
    }
}