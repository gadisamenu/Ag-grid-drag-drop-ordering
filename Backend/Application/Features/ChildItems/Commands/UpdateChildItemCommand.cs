using ErrorOr;
using MediatR;
using AutoMapper;
using Application.Contracts.Persistance;
using Application.Features.ChildItems.Dtos;
using Application.Common.Errors;


namespace Application.Features.ChildItems.Commands
{
    public class UpdateChildItemCommand : IRequest<ErrorOr<ChildItemDto>>
    {
        public UpdateChildItemDto Payload { get; set; }
        public long Id { get; set; }
    }

    public class UpdateChildItemCommandHandler
        : IRequestHandler<UpdateChildItemCommand, ErrorOr<ChildItemDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateChildItemCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ErrorOr<ChildItemDto>> Handle(
            UpdateChildItemCommand command,
            CancellationToken cancellationToken
        )
        {
            var item =  await _unitOfWork.ChildItemRepo.GetByIdAsync(command.Id);
            if (item == null) return ErrorFactory.NotFound("ChildItem", "Item Not Found");

            item = _mapper.Map(command.Payload, item);

            _unitOfWork.ChildItemRepo.UpdateAsync(item);

            var changes = await _unitOfWork.SaveAsync();

            if (changes.IsError) return changes.Errors;

            return _mapper.Map<ChildItemDto>(item);
        }
    }
}
