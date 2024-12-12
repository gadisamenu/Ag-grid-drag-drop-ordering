using Application.Common.Errors;
using Application.Contracts.Persistance;

using Application.Contracts.Persistence;
using AutoMapper;
using ErrorOr;

namespace Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private  IParentItemRepository _parentItemRepository;
        private  IChildItemRepository _childItemRepository;

        public UnitOfWork(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;

        }

        public IParentItemRepository ParentItemRepo
        {
            get
            {
                _parentItemRepository ??= new ParentItemRepository(_dbContext);
                return _parentItemRepository;
            }
        }

         public IChildItemRepository ChildItemRepo
        {
            get
            {
                _childItemRepository ??= new ChildItemRepository(_dbContext);
                return _childItemRepository;
            }
        }

       


        public void Dispose()
        {
            _dbContext.Dispose();
            GC.SuppressFinalize(this);
        }

        public async Task<ErrorOr<int>> SaveAsync()
        {

            var changes = await _dbContext.SaveChangesAsync();

            if (changes == 0)
                return ErrorFactory.InternalServerError("General", "Database Error: Unable To Save");
            return changes;
        }
    }
}
