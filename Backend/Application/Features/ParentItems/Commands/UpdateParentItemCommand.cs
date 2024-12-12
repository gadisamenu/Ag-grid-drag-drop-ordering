using ErrorOr;
using MediatR;
using AutoMapper;
using Application.Contracts.Persistance;
using Application.Features.ParentItems.Dtos;
using Application.Common.Errors;
using Domain;


namespace Application.Features.ParentItems.Commands
{
    public class UpdateParentItemCommand : IRequest<ErrorOr<ParentItemDto>>
    {
        public UpdateParentItemDto Payload { get; set; }
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
            var itemData = _mapper.Map<ParentItem>(command.Payload);

            var item = await _unitOfWork.ParentItemRepo.AddAsync(itemData);

            var changes = await _unitOfWork.SaveAsync();

            if (changes.IsError) return changes.Errors;

            return _mapper.Map<ParentItemDto>(item);
        }
    }
}
