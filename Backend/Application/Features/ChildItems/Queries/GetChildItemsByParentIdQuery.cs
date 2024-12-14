using Application.Contracts.Persistance;
using Application.Features.ChildItems.Dtos;
using AutoMapper;
using MediatR;
using ErrorOr;


namespace Application.Features.ChildItems.Queries;

public class GetChildItemsByParentIdQuery : IRequest<ErrorOr<List<ChildItemListDto>>>
{
    public long ParentId { get; set; }
}

public class GetChildItemsByParentIdQueryHandler : IRequestHandler<GetChildItemsByParentIdQuery, ErrorOr<List<ChildItemListDto>>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetChildItemsByParentIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ErrorOr<List<ChildItemListDto>>> Handle(GetChildItemsByParentIdQuery request,
        CancellationToken cancellationToken)
    {
        var childItems = await _unitOfWork.ChildItemRepo.GetChildItemsWithParentIdAsync( request.ParentId);


        return  _mapper.Map<List<ChildItemListDto>>(childItems);
    }
}