using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace App.Server.Migrations
{
    /// <inheritdoc />
    public partial class change_taskPriotity_to_priority : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TaskPriority",
                table: "Tasks",
                newName: "Priority");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Priority",
                table: "Tasks",
                newName: "TaskPriority");
        }
    }
}
