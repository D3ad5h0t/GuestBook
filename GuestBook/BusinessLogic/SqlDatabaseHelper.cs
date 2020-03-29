using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using GuestBook.Models;
using Microsoft.Data.SqlClient;

namespace GuestBook.BusinessLogic
{
    public static class SqlDatabaseHelper
    {
        private static string _connectionString = "Data Source=172.16.1.201\\sqlexpress;User Id=sa;Password=Q!W@E#R$T%q;";
        private const string MASTER = "master";
        private const string DATABASE = "GuestBook";

        /// <summary> Выполнить SQL-команду </summary>
        public static void ExecuteSqlCommand(string query, string initialCatalog = "")
        {
            if (initialCatalog != "")
            {
                _connectionString += $"Initial Catalog={initialCatalog};";
            }

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {

                SqlCommand command = new SqlCommand(query, connection);

                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }


        /// <summary> Создает новую базу данных GuestBook </summary>
        public static void CreateDatabase()
        {
            string query = "CREATE Database GuestBook";
            ExecuteSqlCommand(query, MASTER);

            CreateMessageTable();
        }

        public static void CreateMessageTable()
        {
            string query = @"CREATE TABLE Messages
                             (
                                 ID int IDENTITY(1,1) NOT NULL,
                                 UserName nvarchar(max) NULL,
                                 Email nvarchar(max) NULL,
                                 HomePage nvarchar(max) NULL,
                                 Text nvarchar(max) NULL,
                                 CreationDate datetime NULL,
                                 ClientIp nvarchar(max) NULL,
                                 Browser nvarchar(max) NULL,
                             );";

            ExecuteSqlCommand(query, DATABASE);
        }

        public static void InsertIntoMessageTable(Message message)
        {
            string query = @"INSERT INTO Messages
                             (
                                 UserName,
                                 Email,
                                 HomePage,
                                 Text,
                                 CreationDate,
                                 ClientIp,
                                 Browser
                             ) VALUES (@UserName, @Email, @HomePage, @Text, @CreationDate, @ClientIp, @Browser)";


            _connectionString += $"Initial Catalog={DATABASE};";
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {

                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@UserName", message.UserName ?? "");
                command.Parameters.AddWithValue("@Email", message.Email ?? "");
                command.Parameters.AddWithValue("@HomePage", message.HomePage ?? "");
                command.Parameters.AddWithValue("@Text", message.Text ?? "");
                command.Parameters.AddWithValue("@CreationDate", message.CreationDate);
                command.Parameters.AddWithValue("@ClientIp", message.ClientIp ?? "");
                command.Parameters.AddWithValue("@Browser", message.Browser ?? "");

                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }

        public static List<Message> GetMessages()
        {
            List<Message> list = new List<Message>();
            _connectionString += $"Initial Catalog={DATABASE};";
            string query = "SELECT * FROM [GuestBook].[dbo].[Messages]";

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand();
                command.CommandText = query;
                command.Connection = connection;
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    Message message = new Message();
                    message.Id = reader.GetValue(0) != null ? reader.GetValue(0).ToString() : null;
                    message.UserName = reader.GetValue(1) != null ? reader.GetValue(1).ToString() : null;
                    message.Email = reader.GetValue(2) != null ? reader.GetValue(2).ToString() : null;
                    message.HomePage = reader.GetValue(3) != null ? reader.GetValue(3).ToString() : null;
                    message.Text = reader.GetValue(4) != null ? reader.GetValue(4).ToString() : null;
                    message.CreationDate = reader.GetValue(5) != null ? DateTime.Parse(reader.GetValue(5).ToString()).Date : DateTime.Now;
                    message.ClientIp = reader.GetValue(6) != null ? reader.GetValue(6).ToString() : null;
                    message.Browser = reader.GetValue(7) != null ? reader.GetValue(7).ToString() : null;

                    list.Add(message);
                }

                reader.Close();
            }

            return list;
        }
    }
}
