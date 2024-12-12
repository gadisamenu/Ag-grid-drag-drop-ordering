using MediatR;
using System.Net;
using System.Text.Json;
using ErrorOr;


namespace API.MiddleWares
{
    public class ExceptionHandler
    {

        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;
        private readonly ILogger<ExceptionHandler> _logger;
        public static JsonSerializerOptions options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        private ErrorOr<Unit> response { get; set; }
   
        public ExceptionHandler(RequestDelegate next, ILogger<ExceptionHandler> logger, IHostEnvironment env)
        {
            _env = env;
            _next = next;
            _logger = logger;

        }

        public async Task InvokeAsync(HttpContext context)
        {
            bool failed = false;

            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Exception....................");
                failed = true;
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                _logger.LogError(ex, ex.Message);
                response = Error.Failure("UnkNown", ex.Message);
            }
            finally
            {
                if (failed)
                {
                    context.Response.ContentType = "application/json";
                    var json = JsonSerializer.Serialize(response, options);
                    await context.Response.WriteAsync(json);

                }
            }
        }
    }
}



