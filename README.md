# Chatroom.io
## Current Features
Currently, the chatroom only allows the user to type in a username and a chatroom name or number which then allows them to enter that specific room with specified name. If the user inputs a username that is already being used, then they will be notified to input another name. Other users will then be notified when a new user enters the room as well as notified when a user leaves the room as well. Once a user logs out using the logout button in the chatroom, the username will then become available again. 

The frontend code is located in chat-client and the backend code is located in chat-server. 

## Upcoming Additions
- User account creation with authentication
- User account info (small bio)
- Group support
- New UI to support the above features

Thank you to Akilesh Rao at medium.com for providing design inspiration and help with the socket.io library for version 1. The particular piece that provided aid is linked below. 

https://medium.com/swlh/chat-rooms-with-socket-io-25e9d1a05947
