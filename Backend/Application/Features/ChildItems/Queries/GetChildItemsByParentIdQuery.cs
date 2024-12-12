using Application.Contracts.Persistance;
using Application.Features.ChildItems.Dtos;
using AutoMapper;
using MediatR;
using ErrorOr;
using Application.Common.Responses;


namespace Application.Features.ChildItems.Queries;

public class GetChildItemsByParentIdQuery : IRequest<ErrorOr<BaseResponse<List<ChildItemListDto>>>>
{
    public long ParentId { get; set; }
}

public class GetChildItemsByParentIdQueryHandler : IRequestHandler<GetChildItemsByParentIdQuery, ErrorOr<BaseResponse<List<ChildItemListDto>>>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetChildItemsByParentIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ErrorOr<BaseResponse<List<ChildItemListDto>>>> Handle(GetChildItemsByParentIdQuery request,
        CancellationToken cancellationToken)
    {
        var childItems = await _unitOfWork.ChildItemRepo.GetChildItemsWithParentIdAsync( request.ParentId);


        return new BaseResponse<List<ChildItemListDto>> {
            Value = _mapper.Map<List<ChildItemListDto>>(childItems),
            Message = "Fetch Successful",
        };

    }
}