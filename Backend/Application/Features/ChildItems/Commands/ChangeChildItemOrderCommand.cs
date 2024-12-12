using ErrorOr;
using MediatR;
using AutoMapper;
using Application.Contracts.Persistance;
using Application.Features.ChildItems.Dtos;
using Application.Common.Errors;
using Domain;

namespace Application.Features.ChildItems.Commands
{
    public class ChangeChildItemOrderCommand : IRequest<ErrorOr<ChildItemDto>>
    {
        public ChangeChildItemOrderDto Payload { get; set; }
    }

    public class ChangeChildItemOrderCommandHandler
        : IRequestHandler<ChangeChildItemOrderCommand, ErrorOr<ChildItemDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ChangeChildItemOrderCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ErrorOr<ChildItemDto>> Handle(
            ChangeChildItemOrderCommand command,
            CancellationToken cancellationToken
        )
        {

            ChildItem childItem = await _unitOfWork.ChildItemRepo.GetByIdAsync(command.Payload.Id);
            
            if (childItem == null) return ErrorFactory.NotFound("ChildItem", "Item Not Found");

            // item moved down
            if (command.Payload.NewOrder > childItem.Order){

                // shift items in middle up
                await _unitOfWork.ChildItemRepo.MoveItemsInRange(childItem.ParentId,childItem.Order+1,command.Payload.NewOrder);
            }

            // item moved up
            else if (command.Payload.NewOrder < childItem.Order){

                // shift items in middle down
                await _unitOfWork.ChildItemRepo.MoveItemsInRange(childItem.ParentId,command.Payload.NewOrder,childItem.Order-1,true);
            }

             childItem.Order = command.Payload.NewOrder;

            _unitOfWork.ChildItemRepo.UpdateAsync(childItem);

            var changes = await _unitOfWork.SaveAsync();

            if (changes.IsError) return changes.Errors;

            return _mapper.Map<ChildItemDto>(childItem);
        }
    }
}
