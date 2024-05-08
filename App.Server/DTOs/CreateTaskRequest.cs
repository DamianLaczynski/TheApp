using App.Server.Model;
using System.ComponentModel.DataAnnotations;

namespace App.Server.DTOs
{
    public class CreateTaskRequest
    {
        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        public string? Status { get; set; }

        public string? Priority { get; set; }

        public DateTime? Deadline { get; set; }


    }
}