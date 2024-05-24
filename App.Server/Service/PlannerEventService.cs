using App.Exceptions;
using App.Server.DTOs;
using App.Server.Model;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace App.Server.Service
{
    public interface IPlannerEventService
    {
        Task<IEnumerable<GetPlannerEventResponse>> GetPlannerEventsAsync();
        Task<GetPlannerEventResponse> GetPlannerEventAsync(string id);
        Task<IEnumerable<GetPlannerEventResponse>> GetDayPlanAsync(DateOnly date);

        Task<GetPlannerEventResponse> CreatePlannerEventAsync(CreatePlannerEventRequest createPlannerEventRequest);
        Task<GetPlannerEventResponse> UpdatePlannerEventAsync(string id, UpdatePlannerEventRequest updatePlannerEventRequest);
        Task<bool> DeletePlannerEventAsync(string id);
    }

    public class PlannerEventService : IPlannerEventService
    {
        private readonly ILogger<PlannerEventService> _logger;
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public PlannerEventService(ILogger<PlannerEventService> logger, AppDbContext dbContext, IMapper mapper) 
        {
            _logger = logger;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetPlannerEventResponse>> GetPlannerEventsAsync()
        {
            var plannerEvents = await _dbContext.PlannerEvents.ToListAsync();
            return _mapper.Map<IEnumerable<GetPlannerEventResponse>>(plannerEvents);
        }

        public async Task<GetPlannerEventResponse> GetPlannerEventAsync(string id)
        {
            var plannerEvent = await _dbContext.Tasks.FindAsync(id);
            return _mapper.Map<GetPlannerEventResponse>(plannerEvent);
        }

        public async Task<GetPlannerEventResponse> CreatePlannerEventAsync(CreatePlannerEventRequest createPlannerEventRequest)
        {
            var plannerEvent = _mapper.Map<PlannerEvent>(createPlannerEventRequest);

            _dbContext.PlannerEvents.Add(plannerEvent);

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<GetPlannerEventResponse>(plannerEvent);
        }

        public async Task<GetPlannerEventResponse> UpdatePlannerEventAsync(string id, UpdatePlannerEventRequest updatePlannerEventRequest)
        {
            var existingEvent = await _dbContext.PlannerEvents.FindAsync(id);

            if (existingEvent == null)
            {
                throw new NotFoundException($"PlannerEvent of given id: {id}, Not Found");
            }

            existingEvent.Start = updatePlannerEventRequest.Start;
            existingEvent.End = updatePlannerEventRequest.End;
            if (updatePlannerEventRequest.IsDone != null)
            {
                existingEvent.IsDone = (bool)updatePlannerEventRequest.IsDone;
            }

            existingEvent.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<GetPlannerEventResponse>(existingEvent); ;
        }

        public async Task<bool> DeletePlannerEventAsync(string id)
        {
            var existingEvent = await _dbContext.PlannerEvents.FindAsync(id);

            if (existingEvent == null)
            {
                throw new NotFoundException($"PlannerEvent of given id: {id}, NOT FOUND");
            }

            _dbContext.PlannerEvents.Remove(existingEvent);

            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<GetPlannerEventResponse>> GetDayPlanAsync(DateOnly date)
        {
            var events = await _dbContext.PlannerEvents.Where(pe => pe.Date == date).OrderBy(pe => pe.PlaceNumber).ToListAsync();
            
            return _mapper.Map<IEnumerable<GetPlannerEventResponse>>(events);
        }
    }
}
