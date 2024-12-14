using Microsoft.AspNetCore.Mvc;
using Application.Features.ChildItems.Dtos;
using Application.Features.ChildItems.Queries;
using Application.Features.ChildItems.Commands;

namespace API.Controllers
{
    public class ChildItemsController : BaseController
    {
   
        [HttpGet("{parentId}")]
        public async Task<IActionResult> GetItems([FromRoute] long parentId)
        {
            return HandleResult(await Mediator.Send(new GetChildItemsByParentIdQuery { ParentId = parentId}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] CreateChildItemDto childItem)
        {
            return HandleResult(await Mediator.Send(new CreateChildItemCommand { Payload = childItem }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem([FromBody] UpdateChildItemDto childItem,[FromRoute] long id)
        {
            return HandleResult(await Mediator.Send(new UpdateChildItemCommand { Payload = childItem ,Id = id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem([FromRoute]  long id)
        {
            return HandleResult(await Mediator.Send(new DeleteChildItemCommand { ChildItemId = id }));
        }

        [HttpPut("change-order")]
        public async Task<IActionResult> ChangeOrder([FromBody] ChangeChildItemOrderDto Payload )
        {
            return HandleResult(await Mediator.Send(new ChangeChildItemOrderCommand { Payload = Payload }));
        }
    }
}
