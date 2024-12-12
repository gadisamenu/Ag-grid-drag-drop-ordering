
namespace Application.Features.ChildItems.Dtos;

public class CreateChildItemDto
{
    public string Name { get; set; }

    public long ParentId { get; set; }
}