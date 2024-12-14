using Application.Contracts.Persistance;
using Domain;
using MediatR;

namespace Application.Contracts.Persistence
{
    public interface IParentItemRepository : IRepository<ParentItem>{
        Task<IEnumerable<ParentItem>> GetOrderedItemsAsync();
        Task<Unit> MoveItemsInRange(int startOrder, int? endOrder, bool movedown = false);
    }    
}