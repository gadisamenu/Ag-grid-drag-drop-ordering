using ErrorOr;
using MediatR;
using AutoMapper;
using Application.Contracts.Persistance;
using Application.Features.ParentItems.Dtos;
using Application.Common.Errors;


namespace Application.Features.ParentItems.Commands
{
    public class UpdateParentItemCommand : IRequest<ErrorOr<ParentItemDto>>
    {
        public UpdateParentItemDto Payload { get; set; }
        public long Id { get; set; }
    }

    public class UpdateParentItemCommandHandler
        : IRequestHandler<UpdateParentItemCommand, ErrorOr<ParentItemDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateParentItemCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ErrorOr<ParentItemDto>> Handle(
            UpdateParentItemCommand command,
            CancellationToken cancellationToken
        )
        {

            var item = await _unitOfWork.ParentItemRepo.GetByIdAsync(command.Id);

            if (item == null) return ErrorFactory.NotFound("ParentItem", "Item Not Found");

            item = _mapper.Map(command.Payload, item);

            _unitOfWork.ParentItemRepo.UpdateAsync(item);

            var changes = await _unitOfWork.SaveAsync();

            if (changes.IsError) return changes.Errors;

            return _mapper.Map<ParentItemDto>(item);
        }
    }
}
