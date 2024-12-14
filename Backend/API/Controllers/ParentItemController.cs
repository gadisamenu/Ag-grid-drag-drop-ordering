using Microsoft.AspNetCore.Mvc;
using Application.Features.ParentItems.Dtos;
using Application.Features.ParentItems.Queries;
using Application.Features.ParentItems.Commands;

namespace API.Controllers
{
    public class ParentItemsController : BaseController
    {
   
        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            return HandleResult(await Mediator.Send(new GetParentItemsByParentIdQuery{}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] CreateParentItemDto childItem)
        {
            return HandleResult(await Mediator.Send(new CreateParentItemCommand { Payload = childItem }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem([FromBody] UpdateParentItemDto childItem,[FromRoute] long id)
        {
            return HandleResult(await Mediator.Send(new UpdateParentItemCommand { Payload = childItem ,Id = id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem([FromRoute]  long id)
        {
            return HandleResult(await Mediator.Send(new DeleteParentItemCommand { ParentItemId = id }));
        }

        [HttpPut("change-order")]
        public async Task<IActionResult> ChangeOrder([FromBody] ChangeParentItemOrderDto Payload )
        {
            return HandleResult(await Mediator.Send(new ChangeParentItemOrderCommand { Payload = Payload }));
        }
    }
}
