using App.Server.Chats.Model;
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
    public DbSet<ChatRoom> ChatRooms { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<UserChatRoom> UserChatRooms { get; set; }

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
        optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=postgres");
    }
}