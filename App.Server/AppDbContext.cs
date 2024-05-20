using App.Server.Contacts.Models;
using App.Server.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using StudyBookAPI.Entities;

public class AppDbContext : IdentityDbContext<User>
{
    private readonly IConfiguration Configuration;

    

    public AppDbContext(IConfiguration configuration, DbContextOptions<AppDbContext> options) : base(options)
    {
        Configuration = configuration;
    }

    public DbSet<App.Server.Model.Task> Tasks { get; set; }
    public DbSet<PlannerEvent> PlannerEvents { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<ContactCategory> ContactCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<App.Server.Model.Task>()
            .Property(t => t.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<App.Server.Model.Task>()
            .Property(t => t.Status)
            .HasDefaultValue(App.Server.Model.TaskStatus.New);

        modelBuilder.Entity<App.Server.Model.Task>()
           .Property(t => t.CreatedAt)
           .HasDefaultValueSql("NOW()")
           .ValueGeneratedOnAdd();
        modelBuilder.Entity<App.Server.Model.Task>()
            .Property(t => t.UpdatedAt)
              .HasDefaultValueSql("NOW()")
              .ValueGeneratedOnAddOrUpdate();

        modelBuilder.Entity<PlannerEvent>(eb =>
        {
            eb.Property(t => t.Id).ValueGeneratedOnAdd();
            eb.Property(p => p.CreatedAt)
            .HasDefaultValueSql("NOW()")
            .ValueGeneratedOnAdd();
            
        });

        modelBuilder.Entity<Contact>(eb =>
        {
            eb.Property(c => c.Id)
                .ValueGeneratedOnAdd()
                .IsRequired();

            eb.HasIndex(c => c.Email).IsUnique();

            eb.HasOne(c => c.Category).WithMany(c => c.Contacts).HasForeignKey(c => c.CategoryId).OnDelete(DeleteBehavior.NoAction);
        });
                

        modelBuilder.Entity<ContactCategory>(eb =>
        {
            eb.Property(c => c.Id)
            .ValueGeneratedOnAdd();

            eb.HasOne(c => c.SuperCategory)
            .WithMany(c => c.SubCategories)
            .HasForeignKey(c => c.SuperCategoryId)
            .OnDelete(DeleteBehavior.Restrict);
        });
            

    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Database=AppDb;Username=postgres;Password=postgres");
    }
}