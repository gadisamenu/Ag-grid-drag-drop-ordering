using Application.Contracts.Persistance;
using Application.Features.ParentItems.Dtos;
using AutoMapper;
using MediatR;
using ErrorOr;
using Application.Common.Responses;
using Application.Features.Common;


namespace Application.Features.ParentItems.Queries;

public class GetParentItemsByParentIdQuery :PaginatedQuery, IRequest<ErrorOr<BaseResponse<List<ParentItemDto>>>>
{
}

public class GetParentItemsByParentIdQueryHandler : IRequestHandler<GetParentItemsByParentIdQuery, ErrorOr<BaseResponse<List<ParentItemDto>>>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetParentItemsByParentIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ErrorOr<BaseResponse<List<ParentItemDto>>>> Handle(GetParentItemsByParentIdQuery request,
        CancellationToken cancellationToken)
    {
        var childItems = await _unitOfWork.ParentItemRepo.GetOrderedItemsAsync(request.PageNumber,request.PageSize);

        return new BaseResponse<List<ParentItemDto>> {
            Value = _mapper.Map<List<ParentItemDto>>(childItems),
            Message = "Fetch Successful",
        };

    }
}