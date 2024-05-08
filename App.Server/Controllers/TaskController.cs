using App.Server.DTOs;
using App.Server.Service;
using Microsoft.AspNetCore.Mvc;

namespace App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        /// <summary>
        /// Get all tasks
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<GetTaskResponse>> GetTasksAsync()
        {
            return await _taskService.GetTasksAsync();
        }

        /// <summary>
        /// Get a task by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<GetTaskResponse> GetTaskAsync(string id)
        {
            return await _taskService.GetTaskAsync(id);
        }
        
        /// <summary>
        /// Create a task
        /// </summary>
        /// <param name="createTaskRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<GetTaskResponse> CreateTaskAsync(CreateTaskRequest createTaskRequest)
        {
            return await _taskService.CreateTaskAsync(createTaskRequest);
        }

        /// <summary>
        /// Delete a task by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<bool> DeleteTaskAsync(string id)
        {
            return await _taskService.DeleteTaskAsync(id);
        }

        [HttpPatch("{id}")]
        public async Task<GetTaskResponse> UpdateTaskAsync(string id, [FromBody] UpdateTaskRequest updateTaskRequest)
        {
            return await _taskService.UpdateTaskAsync(id, updateTaskRequest);
        }

    }
}
