using Application.Contracts.Persistence;
using ErrorOr;

namespace Application.Contracts.Persistance
{
    public interface IUnitOfWork : IDisposable
    {
        IParentItemRepository ParentItemRepo { get; }
        IChildItemRepository ChildItemRepo { get; }
        Task<ErrorOr<int>> SaveAsync();
    }
}
