using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations.Security;

public class UserRoleConfiguration : IEntityTypeConfiguration<ParentItem>
{


    public void Configure(EntityTypeBuilder<ParentItem> builder)
    {
        // builder.HasIndex(x => x.Order).IsUnique(true);
        
    }
}