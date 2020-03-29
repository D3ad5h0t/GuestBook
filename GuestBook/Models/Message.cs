using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuestBook.Models
{
    /// <summary>
    /// Модель сообщения
    /// </summary>
    public class Message
    {
        /// <summary> Id сообщения </summary>
        public string Id { get; set; }

        /// <summary> Имя автора сообщения </summary>
        public string UserName { get; set; }

        public string Email { get; set; }

        /// <summary> Домашняя страница </summary>
        public string HomePage { get; set; }

        /// <summary> Текст сообщения </summary>
        public string Text { get; set; }

        /// <summary> Дата создания </summary>
        public DateTime CreationDate { get; set; }

        /// <summary> Ip адрес автора сообщения </summary>
        public string ClientIp { get; set; }

        /// <summary> Браузер автора сообщения </summary>
        public string Browser { get; set; }
    }
}
