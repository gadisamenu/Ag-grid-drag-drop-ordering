using ErrorOr;
using MediatR;
using Application.Contracts.Persistance;
using Application.Common.Errors;
using Domain;


namespace Application.Features.ChildItems.Commands
{
    public class DeleteChildItemCommand : IRequest<ErrorOr<Unit>>
    {
        public long ChildItemId { get; set; }
    }

    public class DeleteChildItemCommandHandler
        : IRequestHandler<DeleteChildItemCommand, ErrorOr<Unit>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteChildItemCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ErrorOr<Unit>> Handle(
            DeleteChildItemCommand command,
            CancellationToken cancellationToken
        )
        {


            ChildItem childItem = await _unitOfWork.ChildItemRepo.GetByIdAsync(command.ChildItemId);
            
            if (childItem == null) return ErrorFactory.NotFound("ChildItem", "Item Not Found");

            _unitOfWork.ChildItemRepo.DeleteAsync(childItem);
            var parent = await _unitOfWork.ParentItemRepo.GetByIdAsync(childItem.ParentId);
            parent.ChildCount -= 1;
            _unitOfWork.ParentItemRepo.UpdateAsync(parent);

            await _unitOfWork.ChildItemRepo.MoveItemsInRange(childItem.ParentId,childItem.Order,null);

            var changes = await _unitOfWork.SaveAsync();

            if (changes.IsError) return changes.Errors; 

            return Unit.Value;
        }
    }
}
