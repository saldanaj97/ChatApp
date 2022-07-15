import bcrypt from "bcrypt";

/* Models */
import UserModel, { USER_TYPES } from "../models/User.js";
import validateUserReqBody from "./ValidationHelper/index.js";

/* Function to get all the users */
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

/* Helper function to verify that a user has entered the correct password for the provided username */
const isPasswordCorrect = async (providedPass, hashedPass) => {
  const result = await bcrypt.compare(providedPass, hashedPass);
  return result;
};

/* Function that will be used to verify a users login information */
const onUserLogin = async (username, password) => {
  try {
    const user = await UserModel.getUserByUsername(username);
    const loginAccepted = await isPasswordCorrect(password, user.password);
    if (!loginAccepted) {
      return { success: false, error: "Invalid login credentials" };
    }
    global.io.sockets.emit("identity", { user }, () => {});
    return { success: true, user };
  } catch (error) {
    return { success: false, error: "Wrong password or username" };
  }
};

/* Helper function that will be used in hashing the passwords using salt */
const hashPassword = async (unhashedPassword) => {
  const hash = await bcrypt.hash(unhashedPassword, 10);
  return hash;
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
        username: { type: types.string },
        password: { type: types.string },
        type: { type: types.enum, options: { enum: USER_TYPES } },
      },
    }));

    // If the data is not validated above, return an error.
    if (!validated.success) return res.status(400).json({ validated });

    //Otherwise, add the data to the req body and send off the req to create a new user
    const { firstName, lastName, username, password, type } = req.body;

    // Hash the password using salt before saving to the DB
    const hashedPassword = await hashPassword(password);

    // Send the new user data to the db
    const user = await UserModel.createUser(firstName, lastName, username, hashedPassword, type);
    return res.status(200).json({ sucess: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

/* Function to delete a user account by their ID */
const onDeleteUserById = async (req, res) => {
  try {
    const successfullyDeletedUser = await UserModel.deleteUserById(req.params.id);
    return res.status(200).json({
      success: true,
      message: `Deleted ${successfullyDeletedUser.deletedCount} account(s) matching the provided ID. `,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export default {
  onGetAllUsers,
  onGetUserById,
  onUserLogin,
  onCreateUser,
  onDeleteUserById,
};
