using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuestBook.Models.Base
{
    /// <summary> Базовый элемент схемы таблицы (Колонка) </summary>
    public class TableSchemaItem
    {
        /// <summary> Текст элемента </summary>
        public string Text { get; set; }

        /// <summary> Является ли элемент сортируемым </summary>
        public bool IsSortableColumn { get; set; }

        /// <summary> Производится ли сортировка по данному элементу </summary>
        public bool IsCurrentSortColumn { get; set; }

        /// <summary> Сортировка производится по возрастанию </summary>
        public bool IsSortAsc { get; set; }
    }
}
