using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace App.Server.Migrations
{
    /// <inheritdoc />
    public partial class updatechats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_AspNetUsers_SenderId",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_ChatRooms_ChatRoomId",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChatRoom_AspNetUsers_UserId",
                table: "UserChatRoom");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChatRoom_ChatRooms_ChatRoomId",
                table: "UserChatRoom");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserChatRoom",
                table: "UserChatRoom");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Message",
                table: "Message");

            migrationBuilder.RenameTable(
                name: "UserChatRoom",
                newName: "UserChatRooms");

            migrationBuilder.RenameTable(
                name: "Message",
                newName: "Messages");

            migrationBuilder.RenameIndex(
                name: "IX_UserChatRoom_ChatRoomId",
                table: "UserChatRooms",
                newName: "IX_UserChatRooms_ChatRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Message_SenderId",
                table: "Messages",
                newName: "IX_Messages_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Message_ChatRoomId",
                table: "Messages",
                newName: "IX_Messages_ChatRoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserChatRooms",
                table: "UserChatRooms",
                columns: new[] { "UserId", "ChatRoomId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Messages",
                table: "Messages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_AspNetUsers_SenderId",
                table: "Messages",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_ChatRooms_ChatRoomId",
                table: "Messages",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChatRooms_AspNetUsers_UserId",
                table: "UserChatRooms",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChatRooms_ChatRooms_ChatRoomId",
                table: "UserChatRooms",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_AspNetUsers_SenderId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_ChatRooms_ChatRoomId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChatRooms_AspNetUsers_UserId",
                table: "UserChatRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChatRooms_ChatRooms_ChatRoomId",
                table: "UserChatRooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserChatRooms",
                table: "UserChatRooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Messages",
                table: "Messages");

            migrationBuilder.RenameTable(
                name: "UserChatRooms",
                newName: "UserChatRoom");

            migrationBuilder.RenameTable(
                name: "Messages",
                newName: "Message");

            migrationBuilder.RenameIndex(
                name: "IX_UserChatRooms_ChatRoomId",
                table: "UserChatRoom",
                newName: "IX_UserChatRoom_ChatRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_SenderId",
                table: "Message",
                newName: "IX_Message_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_ChatRoomId",
                table: "Message",
                newName: "IX_Message_ChatRoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserChatRoom",
                table: "UserChatRoom",
                columns: new[] { "UserId", "ChatRoomId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Message",
                table: "Message",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_AspNetUsers_SenderId",
                table: "Message",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_ChatRooms_ChatRoomId",
                table: "Message",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChatRoom_AspNetUsers_UserId",
                table: "UserChatRoom",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChatRoom_ChatRooms_ChatRoomId",
                table: "UserChatRoom",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
