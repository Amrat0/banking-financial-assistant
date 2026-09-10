using Banking___Financial_Assistant_Bot.Models;
using Google.GenAI;

namespace Banking___Financial_Assistant_Bot.Services
{
    // Sends messages to Google Gemini and returns the response
    public class ChatService
    {
        private readonly Client _client;
        private readonly string _model;

        public ChatService(IConfiguration config)
        {
            var apiKey = config["Gemini:ApiKey"];

            if (string.IsNullOrWhiteSpace(apiKey))
            {
                throw new InvalidOperationException(
                    "Gemini API key is missing from appsettings.json."
                );
            }

            _model = config["Gemini:Model"] ?? "gemini-3.6-flash";

            _client = new Client(apiKey: apiKey);
        }

        public async Task<ChatResponse> GetResponseAsync(
            string userMessage,
            List<Models.ChatMessage>? history,
            CancellationToken ct = default)
        {
            try
            {
                // Define the AI's behavior
                string prompt =
                    "You are an intelligent, professional Banking and Financial Assistant. " +
                    "Provide accurate, fact-based answers. " +
                    "Keep responses clear and concise. " +
                    "If you are unsure, clearly say that you are unsure.\n\n";

                // Add previous conversation so Gemini has context
                if (history != null && history.Count > 0)
                {
                    prompt += "Previous conversation:\n";

                    foreach (var m in history)
                    {
                        if (m.Role.Equals("user", StringComparison.OrdinalIgnoreCase))
                        {
                            prompt += $"User: {m.Content}\n";
                        }
                        else if (m.Role.Equals("assistant", StringComparison.OrdinalIgnoreCase))
                        {
                            prompt += $"Assistant: {m.Content}\n";
                        }
                    }

                    prompt += "\n";
                }

                // Add current user message
                prompt += $"User: {userMessage}\n";
                prompt += "Assistant:";

                // Send request to Gemini
                var response = await _client.Models.GenerateContentAsync(
                    model: _model,
                    contents: prompt
                );

                // Get Gemini response
                var reply = response?.Text;

                if (string.IsNullOrWhiteSpace(reply))
                {
                    return new ChatResponse
                    {
                        Success = false,
                        Error = "Gemini returned an empty response."
                    };
                }

                return new ChatResponse
                {
                    Success = true,
                    Message = reply
                };
            }
            catch (Exception ex)
            {
                return new ChatResponse
                {
                    Success = false,
                    Error = ex.Message
                };
            }
        }
    }
}