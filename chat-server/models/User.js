import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const USER_TYPES = {
  CONSUMER: "consumer",
  SUPPORT: "support",
};

/* Table schema for a user. 
    - id: randomly get a string from uuidv4
    - type: either consumer or support 
*/
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    type: String,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.statics.createUser = async function (firstName, lastName, type) {
  try {
    const user = await this.create({ firstName, lastName, type });
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserById = async function (id) {
  try {
    const userFoundById = await this.findOne({ _id: id });
    return userFoundById;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getAllUsers = async function () {
  try {
    const allUsers = await this.find();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.deleteUserById = async function (id) {
  try {
    const successfullyDeletedUser = await this.deleteOne({ _id: id });
    return successfullyDeletedUser;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);
