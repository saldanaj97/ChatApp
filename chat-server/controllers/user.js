/* Models */
import UserModel, { USER_TYPES } from "../models/User.js";
import validateUserReqBody from "./ValidationHelper/index.js";

/* Helper function that will check to see if the data is as follows:
    - firstName, lastName, email: String
    - type: Array
*/

const onGetAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.getAllUsers();
    return res.status(200).json({ success: true, allUsers });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

/* Function that will be used to get a user by the id */
const onGetUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

/* Function that will be used to handle the req and res of a newly created user */
const onCreateUser = async (req, res) => {
  try {
    // Make sure the data entered is valid before sending the post req
    const validated = validateUserReqBody((types) => ({
      payload: req.body,
      checks: {
        firstName: { type: types.string },
        lastName: { type: types.string },
        type: { type: types.enum, options: { enum: USER_TYPES } },
      },
    }));

    // If the data is not validated above, return an error.
    if (!validated.success) return res.status(400).json({ validated });

    //Otherwise, add the data to the req body and send off the req to create a new user
    const { firstName, lastName, type } = req.body;
    const user = await UserModel.createUser(firstName, lastName, type);
    return res.status(200).json({ sucess: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const onDeleteUserById = async (req, res) => {
  try {
    const successfullyDeletedUser = await UserModel.deleteUserById(
      req.params.id
    );
    return res.status(200).json({
      success: true,
      message: `Deleted ${successfullyDeletedUser.deletedCount} account(s) matching the provided ID. `,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export default { onGetAllUsers, onGetUserById, onCreateUser, onDeleteUserById };
