using Application.Contracts.Persistance;
using Domain;
using MediatR;

namespace Application.Contracts.Persistence;

public interface IChildItemRepository : IRepository<ChildItem>
{
    Task<List<ChildItem>> GetChildItemsWithParentIdAsync(long parentId);
    Task<Unit> MoveItemsInRange(long parentId,int startOrder, int? endOrder, bool movedown = false);
    Task<Unit> DeleteByParentId(long parentId);
}