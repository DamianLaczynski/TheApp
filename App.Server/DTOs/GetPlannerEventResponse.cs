namespace App.Server.DTOs
{
    public class GetPlannerEventResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateOnly Date {  get; set; }
        public bool IsDone { get; set; }
        public int? Duration { get; set; }

        public TimeOnly? Start { get; set; }
        public TimeOnly? End { get; set; }

    }
}
