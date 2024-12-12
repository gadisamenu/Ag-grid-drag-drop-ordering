using ErrorOr;

namespace Application.Common.Errors{
    
    public static class ErrorFactory
    {
        // Read
        public static Error NotFound(string entityName, string errorMessage) => Error.NotFound($"{entityName}.NotFound", $"{errorMessage}");

        // Create
        public static Error Conflict(string entityName, string errorMessage) => Error.Conflict($"{entityName}.Conflict", $"{errorMessage}");

        // Validation errors for Create/Update
        public static Error ValidationFailed(string entityName, string errorMessage) => Error.Validation($"{entityName}.ValidationFailed", $"{errorMessage}");

        // Authorization error
        public static Error AuthorizationError(string entityName, string errorMessage) => Error.Unauthorized($"{entityName}.AuthorizationError", $"{errorMessage}");

        // Not supported error
        public static Error NotSupportedError(string entityName, string errorMessage) => Error.Unexpected($"{entityName}.NotSupported", $"{errorMessage}");

        // Bad request error
        public static Error BadRequestError(string entityName, string errorMessage) => Error.Failure($"{entityName}.BadRequest", $"{errorMessage}");
        public static Error InternalServerError(string entityName, string errorMessage) => Error.Failure($"{entityName}.BadRequest", $"{errorMessage}");
    }
}