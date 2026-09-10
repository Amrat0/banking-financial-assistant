using Microsoft.AspNetCore.Mvc;
using Banking___Financial_Assistant_Bot.Models;
using Banking___Financial_Assistant_Bot.Services;

namespace Banking___Financial_Assistant_Bot.Controllers
{
    public class ChatController : Controller
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        public IActionResult Index()
        {
            return View();
        }

        // Called when user clicks Send
        // Sends the message to Gemini and returns the AI response
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SendMessage(
            [FromBody] ChatRequest request,
            CancellationToken ct)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Message))
            {
                return Json(new ChatResponse
                {
                    Success = false,
                    Error = "Message is required!"
                });
            }

            var response = await _chatService.GetResponseAsync(
                request.Message,
                request.History,
                ct
            );

            return Json(response);
        }
    }
}