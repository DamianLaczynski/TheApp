using App.Exceptions;
using Microsoft.AspNetCore.Diagnostics;

namespace App.Server
{
    public class AppExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<AppExceptionHandler> _logger;
        public AppExceptionHandler(ILogger<AppExceptionHandler> logger)
        {
            _logger = logger;
        }
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            (int statusCode, string message) = exception switch
            {
                ForbiddenException => (403, ""),
                BadRequestException badRequestException => (400, badRequestException.Message),
                NotFoundException notFoundException => (404, notFoundException.Message),
                KeyNotFoundException keyNotFoundException => (404, keyNotFoundException.Message),
                NotImplementedException => (501, "Not implemented"),
                _ => (500, "An error occurred")
            };

            httpContext.Response.StatusCode = statusCode;
            await httpContext.Response.WriteAsync(message);

            _logger.LogError(exception, message);

            return true;
        }
    }
}
