using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GuestBook.Models.Base;

namespace GuestBook.Models
{
    public class TableSchema
    {
        public TableSchemaItem CreationDate { get; set; }

        public TableSchemaItem UserName { get; set; }

        public TableSchemaItem Email { get; set; }

        public TableSchemaItem Text { get; set; }
    }
}
