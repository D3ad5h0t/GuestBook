using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace GuestBook.BusinessLogic
{
    public static class ClientWebInfo
    {
        /// <summary> Возвращает текущий Ip-адресс пользователя </summary>
        public static string GetIpAddress()
        {
            string ipAddress = "";

            try
            {
                IPHostEntry host = default(IPHostEntry);
                string hostname = Environment.MachineName;
                host = Dns.GetHostEntry(hostname);

                foreach (IPAddress ip in host.AddressList)
                {
                    if (ip.AddressFamily == AddressFamily.InterNetwork)
                    {
                        ipAddress = Convert.ToString(ip);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return ipAddress;
        }
        
    }
}
