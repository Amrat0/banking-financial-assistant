// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


        // ==========================================
    // GET HTML ELEMENTS
    // ==========================================

    const sendButton =
    document.getElementById('btnSend');

    const chatInput =
    document.getElementById('chatInput');

    const chatMessages =
    document.getElementById('chatMessages');

    const chatWelcome =
    document.getElementById('chatWelcome');

    const chatTyping =
    document.getElementById('chatTyping');


    // ==========================================
    // SEND BUTTON CLICK
    // ==========================================

    sendButton.addEventListener(
    'click',
    sendMessage
    );


    // ==========================================
    // PRESS ENTER TO SEND
    // ==========================================

    chatInput.addEventListener(
    'keydown',
    function (e) {

                if (e.key === 'Enter' && !e.shiftKey) {

        e.preventDefault();

    sendMessage();
                }

            }
    );


    // ==========================================
    // ADD MESSAGE TO CHAT
    // ==========================================

    function addMessage(
    role,
    text,
    isError = false
    ) {

        // Hide welcome message
        chatWelcome.style.display = 'none';


    // Create message container
    const div =
    document.createElement('div');


    // Add CSS classes
    div.className =
    'chat-message ' +
    role +
    (isError ? ' chat-error' : '');


    // ==========================================
    // AVATAR
    // ==========================================

    const avatar =
    document.createElement('span');

    avatar.className =
    'chat-avatar';

    avatar.textContent =
    role === 'user'
    ? 'You'
    : '👤';


    // ==========================================
    // MESSAGE TEXT
    // ==========================================

    const messageText =
    document.createElement('span');

    messageText.className =
    'chat-text';


    // textContent is safer than innerHTML
    messageText.textContent =
    text;


    // Add avatar
    div.appendChild(avatar);


    // Add message
    div.appendChild(messageText);


    // Add message to chat
    chatMessages.appendChild(div);


    // Scroll to bottom
    chatMessages.scrollTop =
    chatMessages.scrollHeight;
        }


    // ==========================================
    // SHOW AI THINKING
    // ==========================================

    function showTyping() {

        chatTyping.style.display =
        'flex';

    chatMessages.scrollTop =
    chatMessages.scrollHeight;
        }


    // ==========================================
    // HIDE AI THINKING
    // ==========================================

    function hideTyping() {

        chatTyping.style.display =
        'none';
        }


    // ==========================================
    // SEND MESSAGE TO CONTROLLER
    // ==========================================

    async function sendMessage() {

            // Get user text
            const text =
    chatInput.value.trim();


    // Don't send empty message
    if (!text) {
                return;
            }


    // ==========================================
    // DISABLE INPUT
    // ==========================================

    sendButton.disabled = true;

    chatInput.disabled = true;


    // Clear input
    chatInput.value = '';


    // ==========================================
    // SHOW USER MESSAGE
    // ==========================================

    addMessage(
    'user',
    text
    );


    // ==========================================
    // SHOW AI THINKING
    // ==========================================

    showTyping();


    // ==========================================
    // BUILD CONVERSATION HISTORY
    // ==========================================

    const history = [];


    const messages =
    document.querySelectorAll(
    '#chatMessages .chat-message'
    );


    // Exclude latest user message
    // because current message is sent separately

    for (
    let i = 0;
    i < messages.length - 1;
    i++
    ) {

                const currentMessage =
    messages[i];


    const messageText =
    currentMessage
    .querySelector('.chat-text')
    .textContent;


    const role =
    currentMessage.classList.contains('user')
    ? 'user'
    : 'assistant';


    history.push({

        role: role,

    content: messageText

                });

            }


    // ==========================================
    // SEND REQUEST
    // ==========================================

    try {

                // Get Anti-Forgery Token
                const tokenElement =
    document.querySelector(
    'input[name="__RequestVerificationToken"]'
    );


    if (!tokenElement) {

                    throw new Error(
    'Anti-forgery token was not found.'
    );
                }


    const token =
    tokenElement.value;


    // ==========================================
    // CALL ASP.NET CORE CONTROLLER
    // ==========================================

    const response =
    await fetch(
    '/Chat/SendMessage',
    {

        method: 'POST',

    headers: {

        'Content-Type':
    'application/json',

    'RequestVerificationToken':
    token
                            },

    body: JSON.stringify({

        message: text,

    history: history

                            })

                        }
    );


    // ==========================================
    // CHECK SERVER RESPONSE
    // ==========================================

    if (!response.ok) {

                    throw new Error(
    'Server returned HTTP ' +
    response.status
    );
                }


    // Convert response to JSON
    const data =
    await response.json();


    // ==========================================
    // HIDE AI THINKING
    // ==========================================

    hideTyping();


    // ==========================================
    // DISPLAY AI RESPONSE
    // ==========================================

    if (data.success) {

        addMessage(
            'assistant',
            data.message
        );

                }
    else {

        addMessage(
            'assistant',
            data.error ||
            'Something went wrong.',
            true
        );

                }

            }
    catch (error) {

        // Hide AI thinking
        hideTyping();


    // Show error in browser console
    console.error(
    'Chat error:',
    error
    );


    // Display error message
    addMessage(
    'assistant',
    'Connection failed. Please try again.',
    true
    );

            }


    // ==========================================
    // ENABLE INPUT AGAIN
    // ==========================================

    sendButton.disabled = false;

    chatInput.disabled = false;


    // Put cursor back into input
    chatInput.focus();

        }

    // ==========================================
    // QUICK BANKING CARDS
    // ==========================================

    const quickCards =
    document.querySelectorAll('.quick-card');


    quickCards.forEach(function (card) {

        card.addEventListener('click', function () {

            // Get predefined question
            const message =
                card.getAttribute('data-message');


            // Put question into chatbot input
            chatInput.value = message;


            // Automatically send it
            sendMessage();

        });

    });
    const darkModeBtn = document.getElementById("darkModeBtn");

    darkModeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️";
        } else {
        darkModeBtn.textContent = "🌙";
        }
    });


