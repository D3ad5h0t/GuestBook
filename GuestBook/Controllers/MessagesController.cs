using System;
using System.Collections.Generic;
using System.Linq;
using GuestBook.Models;
using Microsoft.AspNetCore.Mvc;
using GuestBook.BusinessLogic;
using Newtonsoft.Json;

namespace GuestBook.Controllers
{
    public class MessagesController : Controller
    {
        [HttpPost]
        [Route("api/Messages/CreateMessage")]
        //TODO: Добавить валидацию сообщения
        public IActionResult CreateMessage([FromBody] Message message)
        {
            message.CreationDate = DateTime.Now;
            message.ClientIp = ClientWebInfo.GetIpAddress();
            SqlDatabaseHelper.InsertIntoMessageTable(message);

            return Json(message);
        }

        [HttpPost]
        [Route("api/Messages/GetMessages")]
        public IActionResult GetMessages(string json)
        {
            PageViewModel model = JsonConvert.DeserializeObject<PageViewModel>(json);
            List<Message> list = SqlDatabaseHelper.GetMessages();

            if (model.TableSchema.CreationDate.IsCurrentSortColumn)
            {
                list = model.TableSchema.CreationDate.IsSortAsc
                    ? list.OrderBy(x => x.CreationDate).ToList()
                    : list.OrderByDescending(x => x.CreationDate).ToList();
            }

            if (model.TableSchema.Email.IsCurrentSortColumn)
            {
                list = model.TableSchema.Email.IsSortAsc
                    ? list.OrderBy(x => x.Email).ToList()
                    : list.OrderByDescending(x => x.Email).ToList();
            }

            if (model.TableSchema.UserName.IsCurrentSortColumn)
            {
                list = model.TableSchema.UserName.IsSortAsc
                    ? list.OrderBy(x => x.UserName).ToList()
                    : list.OrderByDescending(x => x.UserName).ToList();
            }

            if (model.TableSchema.Text.IsCurrentSortColumn)
            {
                list = model.TableSchema.Text.IsSortAsc
                    ? list.OrderBy(x => x.Text).ToList()
                    : list.OrderByDescending(x => x.Text).ToList();
            }

            model.PageCount = (int) Math.Ceiling(list.Count / (double) model.ItemsOnPage);
            model.Data = list.Skip((model.CurrentPage - 1) * model.ItemsOnPage).Take(model.ItemsOnPage).ToList();

            return Json(JsonConvert.SerializeObject(model));
        }
    }
}