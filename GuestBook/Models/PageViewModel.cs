using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuestBook.Models
{
    /// <summary>
    /// Модель Настроек отображения страницы
    /// </summary>
    public class PageViewModel
    {
        /// <summary> Сообщения отображаемые на странице </summary>
        public List<Message> Data { get; set; }

        /// <summary> Количество страниц с элементами </summary>
        public int PageCount { get; set; }

        /// <summary> Текущая страница </summary>
        public int CurrentPage { get; set; }

        /// <summary> Количество отображаемых элементов на странице </summary>
        public int ItemsOnPage { get; set; }

        /// <summary> Cхема таблицы </summary>
        public TableSchema TableSchema { get; set; }
    }
}
