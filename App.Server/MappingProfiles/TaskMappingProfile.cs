using AutoMapper;

namespace App.Server.MappingProfiles
{
    public class TaskMappingProfile : Profile
    {
        public TaskMappingProfile()
        {
            CreateMap<Model.Task, DTOs.GetTaskResponse>();
            CreateMap<DTOs.CreateTaskRequest, Model.Task>();
        }
    }
}
