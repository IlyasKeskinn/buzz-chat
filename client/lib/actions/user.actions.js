"use server";
import { connectToDatabase } from "../database";
import { login } from "../lib";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseStorage } from "@/utils/FirebaseConfig";
import { dataURLtoBlob } from "../helpers/dataURLtoBlob";
import User from "../database/models/user.model";

export async function checkUser(email) {
  connectToDatabase();

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return JSON.parse(JSON.stringify(user));
    }

    login(user._id);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new Error(error);
  }
}

export async function createUser(data) {
  await connectToDatabase();
  const { email, username, bio } = data;
  let { avatarURL } = data;
  try {
    const existingUserName = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });
    const existingEmail = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (existingUserName) {
      throw new Error(
        "This username is already taken. Please choose a different one."
      );
    }

    if (existingEmail) {
      throw new Error(
        "This email is already taken. You can log in to your account."
      );
    }
    if (avatarURL) {
      const storageRef = ref(firebaseStorage, `${username}.jpg`);
      const blob = dataURLtoBlob(avatarURL);

      const snapshot = await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      avatarURL = downloadURL;
    }

    const newUser = await User.create({
      email,
      username,
      bio,
      avatarURL,
    });

    login(newUser._id);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    throw new Error(error);
  }
}

export async function editUser(data) {
  try {
    const { _id, username, bio } = data;
    let { avatarURL } = data;

    if (!username) {
      throw new Error("Username required!");
    }
    await connectToDatabase();

    const editedUser = await User.findById(_id);

    if (!editedUser) {
      throw new Error("This user not found!");
    }

    if (!(editedUser.username.toLowerCase() == username.toLowerCase())) {
      const existingUser = await User.findOne({
        username: { $regex: new RegExp(`^${username}$`, "i") },
      });
      if (existingUser) {
        throw new Error("This username is already taken!");
      }
    }
    if (avatarURL && !avatarURL.includes(".com")) {
      // Get a reference to the previous avatar (if it exists)
      const oldAvatarRef = ref(firebaseStorage, editedUser.avatarURL);

      // Delete the old avatar
      deleteObject(oldAvatarRef).catch((error) => {
        console.log("Error deleting previous avatar:", error.message);
      });

      const storageRef = ref(firebaseStorage, `${username}.jpg`);
      const blob = dataURLtoBlob(avatarURL);
      const snapshot = await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      avatarURL = downloadURL;
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        username,
        bio,
        avatarURL,
      },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  await connectToDatabase();
  try {
    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    throw new Error(error);
  }
}
