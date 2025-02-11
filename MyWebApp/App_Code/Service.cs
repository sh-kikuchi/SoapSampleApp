using System;
using System.Web.Services;
using System.Collections.Generic;
using System.Web.Script.Services;
using System.Data.SqlClient;


[WebService(Namespace = "http://example.com/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
public class MyWebService : WebService
{

    private string connectionString = @"Server=(localdb)\MSSQLLocalDB;Database=testdb;Integrated Security=True;";

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<User> GetUsers()
    {
        List<User> users = new List<User>();

        using (SqlConnection conn = new SqlConnection(connectionString))
        {
            conn.Open();
            string query = "SELECT id, name, email FROM users";

            using (SqlCommand cmd = new SqlCommand(query, conn))
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    users.Add(new User
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Email = reader.GetString(2)
                    });
                }
            }
        }

        return users;
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
