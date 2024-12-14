using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class ChildItemConfiguration : IEntityTypeConfiguration<ChildItem>
{
    public void Configure(EntityTypeBuilder<ChildItem> builder)
    {
         builder
            .HasOne(c => c.Parent)
            .WithMany()
            .HasForeignKey(c => c.ParentId);

        for (int i = 0; i < 10; i++)
        {
            builder.HasData(new ChildItem
            {
                Id = i + 1,
                Name = $"ChildItem {1}",
                ParentId = i + 1,
                Order = 1
            },new ChildItem
            {
                Id = i + 11,
                Name = $"ChildItem {2}",
                ParentId = i + 1,
                Order = 2
            }
            );
        }
        
    }
}