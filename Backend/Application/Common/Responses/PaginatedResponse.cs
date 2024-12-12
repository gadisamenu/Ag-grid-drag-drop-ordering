using Application.Common.Responses;

namespace Application.Responses;

public class PaginatedResponse<T>: BaseResponse<List<T>>
{
    public int PageNumber  { get; set; }
    public int PageSize { get;set; }
    public int Count { get; set; }
}