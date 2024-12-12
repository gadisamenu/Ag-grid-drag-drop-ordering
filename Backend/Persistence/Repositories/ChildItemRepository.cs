using Domain;
using Application.Contracts.Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using System.Linq.Expressions;

namespace Persistence.Repositories
{
    public class ChildItemRepository(AppDbContext dbContext) : Repository<ChildItem>(dbContext), IChildItemRepository
    {
        public async Task<List<ChildItem>> GetChildItemsWithParentIdAsync(long parentId){

            return await _dbContext.ChildItems.Where(x => x.ParentId == parentId).OrderBy((x)=> x.Order).ToListAsync();
        }


        public async Task<Unit> MoveItemsInRange(long parentId,int startOrder, int? endOrder, bool movedown = false) {

            var change = movedown ? 1 : -1;

            Expression<Func<ChildItem, bool>> condition = endOrder.HasValue
            ? x => x.ParentId == parentId &&  x.Order >= startOrder && x.Order <= endOrder
            : x =>  x.ParentId == parentId && x.Order >= startOrder;

            await _dbContext.ChildItems
            .Where(condition)
            .ExecuteUpdateAsync(p => p.SetProperty(y => y.Order, y => y.Order + change));
            
            return Unit.Value;
        }

        public async Task<Unit> DeleteByParentId(long parentId){
            await _dbContext.ChildItems.Where(x => x.ParentId == parentId).ExecuteDeleteAsync();
            return Unit.Value;
        }
    }
}