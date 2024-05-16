using System.ComponentModel.DataAnnotations;

namespace App.Server.Model
{
    public class PlannerEvent
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateOnly Date { get; set; }

        public bool IsDone { get; set; } = false;

        public int? Duration { get; set; }
        public TimeOnly? Start {  get; set; }
        public TimeOnly? End {  get; set; }

        /// <summary>
        /// Property for ordering events in context of Date
        /// </summary>
        public short PlaceNumber { get; set; } = 0;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        
    }
}
