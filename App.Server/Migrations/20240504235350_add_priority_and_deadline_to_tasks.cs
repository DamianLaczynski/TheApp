using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace App.Server.Migrations
{
    /// <inheritdoc />
    public partial class add_priority_and_deadline_to_tasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Tasks",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "New",
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Deadline",
                table: "Tasks",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaskPriority",
                table: "Tasks",
                type: "varchar(255)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deadline",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "TaskPriority",
                table: "Tasks");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Tasks",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldDefaultValue: "New");
        }
    }
}
