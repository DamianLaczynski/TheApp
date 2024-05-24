using App.Server.Contacts.Models;
using App.Server.Chats.Model;
using App.Server.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using StudyBookAPI.Entities;

/// <summary>
/// Represents the application's database context, inheriting from <see cref="IdentityDbContext{User}"/>.
/// This context is used for interacting with the application's database.
/// </summary>
public class AppDbContext : IdentityDbContext<User>
{
    private readonly IConfiguration Configuration;

    /// <summary>
    /// Initializes a new instance of the <see cref="AppDbContext"/> class with the specified configuration and options.
    /// </summary>
    /// <param name="configuration">The configuration for the application.</param>
    /// <param name="options">The options for configuring the DbContext.</param>
    public AppDbContext(IConfiguration configuration, DbContextOptions<AppDbContext> options) : base(options)
    {
        Configuration = configuration;
    }

    /// <summary>
    /// Gets or sets the DbSet for tasks.
    /// </summary>
    public DbSet<App.Server.Model.Task> Tasks { get; set; }
    public DbSet<ChatRoom> ChatRooms { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<UserChatRoom> UserChatRooms { get; set; }

    /// <summary>
    /// Gets or sets the DbSet for planner events.
    /// </summary>
    public DbSet<PlannerEvent> PlannerEvents { get; set; }

    /// <summary>
    /// Gets or sets the DbSet for contacts.
    /// </summary>
    public DbSet<Contact> Contacts { get; set; }

    /// <summary>
    /// Gets or sets the DbSet for contact categories.
    /// </summary>
    public DbSet<ContactCategory> ContactCategories { get; set; }

    /// <summary>
    /// Configures the schema needed for the identity framework and the application's specific models.
    /// </summary>
    /// <param name="modelBuilder">The builder used to construct the model for the context.</param>
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

            eb.HasOne(c => c.Category)
              .WithMany(c => c.Contacts)
              .HasForeignKey(c => c.CategoryId)
              .OnDelete(DeleteBehavior.NoAction);
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

        modelBuilder.Entity<Message>(eb =>
        {
            eb.HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.SetNull);

            eb.Property(m => m.Id)
            .ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<ChatRoom>(eb =>
        {
            eb.HasMany(c => c.Messages)
                .WithOne(m => m.ChatRoom)
                .HasForeignKey(m => m.ChatRoomId)
                .OnDelete(DeleteBehavior.Cascade);

            eb.Property(m => m.Id)
            .ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<UserChatRoom>(eb =>
        {
            eb.HasKey(ucr => new { ucr.UserId, ucr.ChatRoomId });

            eb.HasOne(ucr => ucr.User)
                .WithMany(u => u.UserChatRooms)
                .HasForeignKey(ucr => ucr.UserId);

            eb.HasOne(ucr => ucr.ChatRoom)
                .WithMany(c => c.UserChatRooms)
                .HasForeignKey(ucr => ucr.ChatRoomId);
        });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Database=AppDb;Username=postgres;Password=postgres");
    }
}
