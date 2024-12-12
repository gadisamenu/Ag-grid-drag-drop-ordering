namespace Application.Features.ParentItems.Dtos;

public class ParentItemDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public int Order { get; set;}
    public int ChildCount { get; set; }
}


