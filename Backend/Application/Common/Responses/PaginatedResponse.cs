
namespace Application.Responses;

public class PaginatedResponse<T>
{
    public List<T> Value { get; set; }
    public int Page  { get; set; }
}