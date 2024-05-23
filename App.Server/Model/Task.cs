using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace App.Server.Model
{
    public class Task
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string? Description { get; set; }

        [Column(TypeName = "varchar(255)")]
        public TaskStatus Status { get; set; }

        [Column(TypeName = "varchar(255)")]
        [AllowNull]
        public TaskPriority Priority { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public DateTime? Deadline { get; set; }

    }

    public enum TaskStatus
    {
        New,
        InProgress,
        Done
    }

    public enum TaskPriority
    {
        None,
        Low,
        Medium,
        High
    }
}
