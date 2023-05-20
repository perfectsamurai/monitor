using Microsoft.EntityFrameworkCore;

namespace monitor
{
    public class DataBase
    {
        public class ApplicationContext : DbContext
        {
           private static ApplicationContext _context;


            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=monitoring;Username=postgres;Password=postgres");
            }
            public static ApplicationContext GetContext()
            {
                if (_context == null)
                {
                    _context = new ApplicationContext();
                }
                return _context;
            }
            public DbSet<User> User { get; set; }

            public static implicit operator ApplicationContext(DataBase v)
            {
                throw new NotImplementedException();
            }
        }
    }
}
