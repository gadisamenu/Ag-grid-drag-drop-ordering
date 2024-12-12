using Application.Features.ParentItems.Dtos;

namespace Application.Features.ChildItems.Dtos;

public class ChildItemDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public int Order { get; set;}
    public ParentItemDto Parent { get; set; }
}


