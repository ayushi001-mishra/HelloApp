const socket = io('http://localhost:8000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
var audio= new Audio('pop.mp3');

var name;
function myfunction(){ 
  name = document.getElementById("firstname").value;
  return true;
}

appendMessage(`You joined`,'right')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`,'left')
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`,'left')
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`,'left')
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`,'right')
  socket.emit('send-chat-message', message)
  messageInput.value = ''
  
})

function appendMessage(message,position) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement)
 if(position == 'left'){   
      audio.play();
}
}