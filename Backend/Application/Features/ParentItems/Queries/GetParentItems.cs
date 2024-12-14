using Application.Contracts.Persistance;
using Application.Features.ParentItems.Dtos;
using AutoMapper;
using MediatR;
using ErrorOr;


namespace Application.Features.ParentItems.Queries;

public class GetParentItemsByParentIdQuery :IRequest<ErrorOr<List<ParentItemDto>>>
{
}

public class GetParentItemsByParentIdQueryHandler : IRequestHandler<GetParentItemsByParentIdQuery, ErrorOr<List<ParentItemDto>>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetParentItemsByParentIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ErrorOr<List<ParentItemDto>>> Handle(GetParentItemsByParentIdQuery request,
        CancellationToken cancellationToken)
    {
        var childItems = await _unitOfWork.ParentItemRepo.GetOrderedItemsAsync();

        return  _mapper.Map<List<ParentItemDto>>(childItems);

    }
}