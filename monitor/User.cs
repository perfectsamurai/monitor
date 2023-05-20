using Microsoft.AspNetCore.Identity;


namespace monitor
{
    public class User
    {
        public string id { get; set; }

        public string first_name { get; set; }
        public string name { get; set; }

        public string last_name { get; set; }
        public string phone { get; set; } 

        public string email { get; set; }
        public string password { get; set; }
         
    }
}