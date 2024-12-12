using Microsoft.AspNetCore.Mvc;
using Application.Features.ParentItems.Dtos;
using Application.Features.ParentItems.Queries;
using Application.Features.ParentItems.Commands;

namespace API.Controllers
{
    public class ParentItemsController : BaseController
    {
   
        [HttpGet]
        public async Task<IActionResult> GetItems(
            [FromQuery] int page = 1, 
            [FromQuery] int size = 10
        )
        {
            return HandleResult(await Mediator.Send(new GetParentItemsByParentIdQuery {PageNumber = page, PageSize = size}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] CreateParentItemDto childItem)
        {
            return HandleResult(await Mediator.Send(new CreateParentItemCommand { Payload = childItem }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateItem([FromBody] UpdateParentItemDto childItem)
        {
            return HandleResult(await Mediator.Send(new UpdateParentItemCommand { Payload = childItem }));
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
