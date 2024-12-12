using AutoMapper;
using Domain;

using Application.Features.ParentItems.Dtos;
using Application.Features.ChildItems.Dtos;

namespace Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
    

            #region ParentItem
            CreateMap<ParentItem, ParentItemDto>();
            CreateMap<CreateParentItemDto, ParentItem>();
            CreateMap<UpdateParentItemDto, ParentItem>();
            #endregion ParentItem

            #region ChildItem
            CreateMap<ChildItem, ChildItemDto>().ForMember(
                destination => destination.Parent, opt => opt.MapFrom(s => s.Parent));
            CreateMap<CreateChildItemDto, ChildItem>();
            CreateMap<UpdateChildItemDto, ChildItem>();
            CreateMap<ChildItem, ChildItemListDto>();
            #endregion ChildItem


        }

    }

}

