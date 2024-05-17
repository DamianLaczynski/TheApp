using App.Server.DTOs;
using App.Server.Service;
using Microsoft.AspNetCore.Mvc;

namespace App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlannerEventController : ControllerBase
    {
        private readonly IPlannerEventService _plannerEventService;

        public PlannerEventController(IPlannerEventService plannerEventService)
        {
            _plannerEventService = plannerEventService;
        }

        /// <summary>
        /// Get all PlannerEvents
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<GetPlannerEventResponse>> GetPlannerEventsAsync()
        {
            return await _plannerEventService.GetPlannerEventsAsync();
        }

        /*[HttpGet]
        public async Task<GetDayPlanResponse> GetDayPlan([FromQuery]DateOnly date) 
        {
            return await _plannerEventService.GetDayPlanAsync(date);
        }*/

        /// <summary>
        /// Get Planner Event by Id
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet("{date}")]
        public async Task<IEnumerable<GetPlannerEventResponse>> GetPlannerEventAsync(DateOnly date)
        {
            return await _plannerEventService.GetDayPlanAsync(date);
        }
        
        /// <summary>
        /// Create Planner Event
        /// </summary>
        /// <param name="createPlannerEventRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<GetPlannerEventResponse> CreatePlannerEventAsync(CreatePlannerEventRequest createPlannerEventRequest)
        {
            return await _plannerEventService.CreatePlannerEventAsync(createPlannerEventRequest);
        }

        /// <summary>
        /// Delete Planner Event
        /// </summary>
        /// <param name="id">Planner Event Id</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<bool> DeletePlannerEventAsync(string id)
        {
            return await _plannerEventService.DeletePlannerEventAsync(id);
        }

        /// <summary>
        /// Update Planner Event
        /// </summary>
        /// <param name="id">Planner Event Id</param>
        /// <param name="updatePlannerEventRequest"></param>
        /// <returns></returns>
        [HttpPatch("{id}")]
        public async Task<GetPlannerEventResponse> UpdatePlannerEventAsync(string id, [FromBody] UpdatePlannerEventRequest updatePlannerEventRequest)
        {
            return await _plannerEventService.UpdatePlannerEventAsync(id, updatePlannerEventRequest);
        }

    }
}
