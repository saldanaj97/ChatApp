/* Models */
import UserModel, { USER_TYPES } from '../models/User.js'
import validateUserReqBody from './helpers/validate/index.js'

/* Helper function that will check to see if the data is as follows:
    - firstName, lastName, email: String
    - type: Array
*/

const onGetAllUsers = async (req, res) => { }

const onGetUserById = async (req, res) => { }

const onCreateUser = async (req, res) => {
  try {
    /* Make sure the data is valid before sending the post req, if not notify the user with errors pointing to
     what is wrong */
    const validated = validateUserReqBody(types => ({
      payload: req.body,
      checks: {
        firstName: { type: types.string },
        lastName: { type: types.string },
        type: { type: types.enum, options: { enum: USER_TYPES } }
      }
    }))
    if (!validated.success) return res.status(400).json({ validated })

    /* Now that the data has been validated above, we can send the req and res to user to notify them
     of a succssful account creation */
    const { firstName, lastName, type } = req.body
    const user = await UserModel.createUser(firstName, lastName, type)
    return res.status(200).json({ sucess: true, user })
  } catch (error) {
    /* Return the error that has been caught */
    console.log(error)
    return res.status(500).json({ success: false, error })
  }
}

const onDeleteUserById = async (req, res) => { }

export default { onGetAllUsers, onGetUserById, onCreateUser, onDeleteUserById }