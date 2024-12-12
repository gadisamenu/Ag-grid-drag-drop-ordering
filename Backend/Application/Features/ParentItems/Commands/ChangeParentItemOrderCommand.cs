using ErrorOr;
using MediatR;
using AutoMapper;
using Application.Contracts.Persistance;
using Application.Features.ParentItems.Dtos;
using Application.Common.Errors;
using Domain;

namespace Application.Features.ParentItems.Commands
{
    public class ChangeParentItemOrderCommand : IRequest<ErrorOr<ParentItemDto>>
    {
        public ChangeParentItemOrderDto Payload { get; set; }
    }

    public class ChangeParentItemOrderCommandHandler
        : IRequestHandler<ChangeParentItemOrderCommand, ErrorOr<ParentItemDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ChangeParentItemOrderCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ErrorOr<ParentItemDto>> Handle(
            ChangeParentItemOrderCommand command,
            CancellationToken cancellationToken
        )
        {

            ParentItem childItem = await _unitOfWork.ParentItemRepo.GetByIdAsync(command.Payload.Id);
            
            if (childItem == null) return ErrorFactory.NotFound("ParentItem", "Item Not Found");

            // item moved down
            if (command.Payload.NewOrder > childItem.Order){

                // shift items in middle up
                await _unitOfWork.ParentItemRepo.MoveItemsInRange(childItem.Order+1,command.Payload.NewOrder);
            }

            // item moved up
            else if (command.Payload.NewOrder < childItem.Order){

                // shift items in middle down
                await _unitOfWork.ParentItemRepo.MoveItemsInRange(command.Payload.NewOrder,childItem.Order-1,true);
            }

             childItem.Order = command.Payload.NewOrder;

            _unitOfWork.ParentItemRepo.UpdateAsync(childItem);

            var changes = await _unitOfWork.SaveAsync();

            if (changes.IsError) return changes.Errors;

            return _mapper.Map<ParentItemDto>(childItem);
        }
    }
}
