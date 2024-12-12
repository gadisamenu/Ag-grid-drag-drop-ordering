using ErrorOr;
using MediatR;
using Application.Contracts.Persistance;
using Application.Common.Errors;
using Domain;


namespace Application.Features.ParentItems.Commands
{
    public class DeleteParentItemCommand : IRequest<ErrorOr<Unit>>
    {
        public long ParentItemId { get; set; }
    }

    public class DeleteParentItemCommandHandler
        : IRequestHandler<DeleteParentItemCommand, ErrorOr<Unit>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteParentItemCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ErrorOr<Unit>> Handle(
            DeleteParentItemCommand command,
            CancellationToken cancellationToken
        )
        {

            ParentItem parentItem = await _unitOfWork.ParentItemRepo.GetByIdAsync(command.ParentItemId);
            
            if (parentItem == null) return ErrorFactory.NotFound("ParentItem", "Item Not Found");

            _unitOfWork.ParentItemRepo.DeleteAsync(parentItem);
            await _unitOfWork.ParentItemRepo.MoveItemsInRange(parentItem.Order,null);
            await _unitOfWork.ChildItemRepo.DeleteByParentId(parentItem.Id);
            
            var changes = await _unitOfWork.SaveAsync();
            
            if (changes.IsError) return changes.Errors; 

            return Unit.Value;
        }
    }
}
