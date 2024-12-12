using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Persistence
{
    
    public class AppDbContextFactory: IDesignTimeDbContextFactory<AppDbContext>
    {
         public AppDbContext CreateDbContext(string[] args)
        {
            var directory = Directory.GetParent(Directory.GetCurrentDirectory()).FullName;

            var configuration = new ConfigurationBuilder()
                .SetBasePath(directory)
                .AddJsonFile("API/appsettings.json").Build();


            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseNpgsql(configuration["PostgreSQL:ConnectionString"]);

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
