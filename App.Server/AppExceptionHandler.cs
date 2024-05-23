using App.Exceptions;
using App.Server.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;

namespace App.Server
{
    /// <summary>
    /// Class responsible for handling exceptions in the application, implementing the <see cref="IExceptionHandler"/> interface.
    /// </summary>
    public class AppExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<AppExceptionHandler> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="AppExceptionHandler"/> class with the specified logger.
        /// </summary>
        /// <param name="logger">The logger used for logging errors.</param>
        public AppExceptionHandler(ILogger<AppExceptionHandler> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Attempts to handle the exception by setting the appropriate HTTP status code and response message,
        /// and logging the exception.
        /// </summary>
        /// <param name="httpContext">The HTTP context for the current request.</param>
        /// <param name="exception">The exception to be handled.</param>
        /// <param name="cancellationToken">A token to cancel the asynchronous operation.</param>
        /// <returns>A ValueTask representing the asynchronous operation, always returning <c>true</c>.</returns>
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            (int statusCode, string message) = exception switch
            {
                ForbiddenException => (403, ""),
                NoContentException noContentException => (204, noContentException.Message),
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
