#nullable enable

namespace Application.Common.Responses{
    public class BaseResponse<T>
    {
        public string Message { get; set; } = "";
        public T? Value { get; set; }
    }
}
