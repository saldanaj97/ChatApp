const users = []

// Add a user to the room. Assign an id when provided a room and name. 
const addUser = (id, name, room) => {
  // Check if there already exists a user with the same name or username 
  const exisitingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

  // Errors
  if (exisitingUser) {
    return { 'error': 'Username has already been taken' }
  }

  if (!name && !room) {
    return { 'error': 'Username and room required' }
  }

  if (!name) {
    return { 'error': 'Username is required' }
  }

  if (!room) {
    return { 'error': 'Room is required' }
  }

  const user = { id, name, room }
  users.push(user)
  return { user }
}

// Get a specific user based on id
const getUser = id => {
  let user = users.find(user => user.id == id)
  return user
}

// Delete a specific user based on id
const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) return users.splice(index, 1)[0]
}

// Get all users in the room 
const getUsers = (room) => users.filter(user => user.room === room)

module.exports = { addUser, getUsers, deleteUser, getUser }