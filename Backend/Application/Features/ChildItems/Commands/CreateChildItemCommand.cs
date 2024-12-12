using ErrorOr;
using MediatR;
using AutoMapper;
using Application.Contracts.Persistance;
using Application.Features.ChildItems.Dtos;
using Application.Common.Errors;
using Domain;


namespace Application.Features.ChildItems.Commands
{
    public class CreateChildItemCommand : IRequest<ErrorOr<ChildItemDto>>
    {
        public CreateChildItemDto Payload { get; set; }
    }

    public class CreateChildItemCommandHandler
        : IRequestHandler<CreateChildItemCommand, ErrorOr<ChildItemDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateChildItemCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ErrorOr<ChildItemDto>> Handle(
            CreateChildItemCommand command,
            CancellationToken cancellationToken
        )
        {
            var parent = await _unitOfWork.ParentItemRepo.GetByIdAsync(command.Payload.ParentId);
            if (parent == null) return ErrorFactory.BadRequestError("ParentItem","Not found");

            var itemData = _mapper.Map<ChildItem>(command.Payload);
            parent.ChildCount += 1;
            itemData.Order = parent.ChildCount ;

            var item = await _unitOfWork.ChildItemRepo.AddAsync(itemData);
            _unitOfWork.ParentItemRepo.UpdateAsync(parent);

            var changes = await _unitOfWork.SaveAsync();

            if (changes.IsError) return changes.Errors;

            return _mapper.Map<ChildItemDto>(item);
        }
    }
}
