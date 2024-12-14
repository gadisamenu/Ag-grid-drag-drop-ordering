using System.Linq.Expressions;
using Application.Contracts.Persistence;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace Persistence.Repositories;

public class ParentItemRepository : Repository<ParentItem>, IParentItemRepository
{
    public ParentItemRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<ParentItem>> GetOrderedItemsAsync()
    {
    
        return await _dbContext.ParentItems
            .OrderBy(x => x.Order).ToListAsync();
    }

    public async Task<Unit> MoveItemsInRange(int startOrder, int? endOrder = null, bool moveDown = false)
    {
        var change = moveDown ? -1 : 1;


        Expression<Func<ParentItem, bool>> condition = endOrder.HasValue
            ? x => x.Order >= startOrder && x.Order <= endOrder.Value
            : x => x.Order >= startOrder;

        await _dbContext.ParentItems
            .Where(condition) 
            .ExecuteUpdateAsync(p => p.SetProperty(y => y.Order, y => y.Order - change));

        return Unit.Value;
    }


}