using App.Server.Model;
using AutoMapper;

namespace App.Server.MappingProfiles
{
    public class PlannerEventProfile : Profile
    {
        public PlannerEventProfile()
        {
            CreateMap<PlannerEvent, DTOs.GetPlannerEventResponse>();
            CreateMap<DTOs.CreatePlannerEventRequest, PlannerEvent>();
        }
    }
}
