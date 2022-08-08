# Chatty.io
### Version 2.0
In this version, I have added all the upcoming additions listed below minus one. The one that was not added was the user account info page. There are still some bugs present that will be adressed in the coming versions but the app overall is functioning and has been deployed at https://chattyio.netlify.app/ . 

If you would like to view more infomation about the code, head to either the chat-client(frontend) or the chat-server(backend) folders. 

### An overview of technologies used (MERN)
Frontend:
- React
- Chakra UI
- Netlify (deployment)
- NPM (node_modules not included in repo)

Backend:
- Node
- Express
- MongoDB
- Heroku (deployment)

### New features added for v2.0
- User account creation with authentication
- Group support
- New UI to support the above features

### Not added
- User account info (small bio) (Possibly may not be added)

Below are the updated screenshots of the updated UI (the UI from v1.0 can still be found in the screenshots below the v2.0 screenshots). 
# Login/Home page
![alt text](https://github.com/saldanaj97/ChatApp/blob/master/chat-client/public/login-revised.png)
# Signup page
![alt text](https://github.com/saldanaj97/ChatApp/blob/master/chat-client/public/signup-revised.png)
# Chatroom with groups and the current users popup opened
![alt text](https://github.com/saldanaj97/ChatApp/blob/master/chat-client/public/chat-revised.png)
# New group and add user pop ups
![alt text](https://github.com/saldanaj97/ChatApp/blob/master/chat-client/public/new-group.png)
![alt text](https://github.com/saldanaj97/ChatApp/blob/master/chat-client/public/add-user.png)


### Old Version (v1.0)
Currently, the chatroom only allows the user to type in a username and a chatroom name or number which then allows them to enter that specific room with specified name. If the user inputs a username that is already being used, then they will be notified to input another name. Other users will then be notified when a new user enters the room as well as notified when a user leaves the room as well. Once a user logs out using the logout button in the chatroom, the username will then become available again. 

Screenshots below are from v1.0.0. Expect to see changes as more features are added. 
![alt text](https://github.com/saldanaj97/ChatApp/blob/master/chat-client/public/Homepage.png)
![alt text](https://github.com/saldanaj97/ChatApp/blob/master/chat-client/public/Empty-chatroom.png)
![alt text](https://github.com/saldanaj97/ChatApp/blob/master/chat-client/public/Chatroom-messages.png)


## Thanks
The particular piece that provided design inspiration is linked below. The code however, has been written by me. 

https://medium.com/swlh/chat-rooms-with-socket-io-25e9d1a05947
