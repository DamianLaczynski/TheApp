using App.Exceptions;
using App.Server.DTOs;
using App.Server.Model;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace App.Server.Service
{
    public interface ITaskService
    {
        Task<IEnumerable<GetTaskResponse>> GetTasksAsync();
        Task<GetTaskResponse> GetTaskAsync(string id);
        Task<GetTaskResponse> CreateTaskAsync(CreateTaskRequest createTaskRequest);
        Task<GetTaskResponse> UpdateTaskAsync(string id, UpdateTaskRequest updateTaskRequest);
        Task<bool> DeleteTaskAsync(string id);
    }

    public class TaskService : ITaskService
    {
        private readonly ILogger<TaskService> _logger;
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public TaskService(ILogger<TaskService> logger, AppDbContext dbContext, IMapper mapper) 
        {
            _logger = logger;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetTaskResponse>> GetTasksAsync()
        {
            var tasks = await _dbContext.Tasks.ToListAsync();
            return _mapper.Map<IEnumerable<GetTaskResponse>>(tasks);
        }

        public async Task<GetTaskResponse> GetTaskAsync(string id)
        {
            var task = await _dbContext.Tasks.FindAsync(id);
            return _mapper.Map<GetTaskResponse>(task);
        }

        public async Task<GetTaskResponse> CreateTaskAsync(CreateTaskRequest createTaskRequest)
        {
            var task = _mapper.Map<Model.Task>(createTaskRequest);

            _dbContext.Tasks.Add(task);

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<GetTaskResponse>(task);
        }

        public async Task<GetTaskResponse> UpdateTaskAsync(string id, UpdateTaskRequest task)
        {
            var existingTask = await _dbContext.Tasks.FindAsync(id);

            if (existingTask == null)
            {
                throw new NotFoundException($"Task of given id: {id}, Not Found");
            }

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            var status = existingTask.Status;
            Enum.TryParse<Model.TaskStatus>(task.Status, ignoreCase:true, out status);
            existingTask.Status = status;

            var priority = existingTask.Priority;
            Enum.TryParse<Model.TaskPriority>(task.Priority, out priority);
            existingTask.Priority = priority;
            
            existingTask.UpdatedAt = DateTime.UtcNow;
            existingTask.Deadline = task.Deadline;

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<GetTaskResponse>(existingTask); ;
        }

        public async Task<bool> DeleteTaskAsync(string id)
        {
            var existingTask = await _dbContext.Tasks.FindAsync(id);

            if (existingTask == null)
            {
                throw new NotFoundException($"Task of given id: {id}, Not Found");
            }

            _dbContext.Tasks.Remove(existingTask);

            await _dbContext.SaveChangesAsync();

            return true;
        }

    }
}
