namespace Banking___Financial_Assistant_Bot.Models
{
    // One message in conversation (User or Ai) 
    public class ChatMessage
    {
        public string Role { get; set; }= string.Empty; // user or assistant 
        public string Content {  get; set; }=string.Empty; 

    }
    // What browser send when user clicks Send
    public class ChatRequest
    {
        public string Message { get; set; } = string.Empty;
        public List<ChatMessage>? History { get; set; }  

    }
    // What we send back to the browser (Ai reply or error)
    public class ChatResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string ? Error { get; set; }
    }
    // install a packge nuget package manager console: Install-Package Azure.AI.OpenAI -version 2.3.0-beta.2
}
