using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class ParentItemConfiguration : IEntityTypeConfiguration<ParentItem>
{


    public void Configure(EntityTypeBuilder<ParentItem> builder)
    {
        for (int i = 0; i < 10; i++)
        {
            builder.HasData(new ParentItem
            {
                Id = i + 1,
                Name = $"ParentItem {i + 1}",
                ChildCount = 2,
                Order = i + 1
            });
        }
        
    }
}