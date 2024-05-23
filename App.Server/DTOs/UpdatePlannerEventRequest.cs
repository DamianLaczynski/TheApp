namespace App.Server.DTOs
{
    public class UpdatePlannerEventRequest
    {
        public string? Name { get; set; }
        public bool? IsDone { get; set; }
        public TimeOnly? Duration { get; set; }
        public TimeOnly? Start { get; set; }
        public TimeOnly? End { get; set; }
    }
}
