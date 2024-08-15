"use server";
import { connectToDatabase } from "../database";
import { login } from "../lib";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseStorage } from "@/utils/FirebaseConfig";
import User from "../database/models/user.model";
import { dataURLtoBlob } from "../helpers/dataURLtoBlob";

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

export default async function createUser(data) {
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
