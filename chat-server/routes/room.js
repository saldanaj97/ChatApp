import express from 'express'

/* Controllers */
import room from '../controllers/room.js'

const router = express.Router()

router
    .get('/', room.getRecentConversation)
    .get('/:roomId', room.getConversationByRoomId)
    .post('/initiate', room.initiate)
    .put('/:roomId/message', room.postMessage)
    .put('/:roomId/mark-read', room.markConversationReadByRoomId)

export default router