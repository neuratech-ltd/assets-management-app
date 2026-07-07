import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

interface User {
  id: number;
  email: string;
  password?: string;
  fullName: string;
  designation: string;
  joiningDate: Date;
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
}

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const createUser = async (userData: Partial<User>) => {
  try {
    const joiningDate = userData.joiningDate
      ? typeof userData.joiningDate === "string"
        ? new Date(userData.joiningDate)
        : (userData.joiningDate as Date)
      : new Date();

    // if (!userData.password || userData.password.trim() === "") {
    //   throw new Error("Password is required");
    // }
    const hashedPassword = await bcrypt.hash(userData.password || "", 10);

    const data = {
      email: userData.email!,
      fullName: userData.fullName!,
      password: hashedPassword,
      designation: userData.designation ?? "",
      joiningDate,
      employeeId: userData.employeeId || `emp-${Date.now()}`,
    };

    const newUser = await prisma.user.create({ data });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const updateUser = async (id: number, userData: Partial<User>) => {
  try {
    const data: any = { ...userData };
    if (userData.joiningDate && typeof userData.joiningDate === "string") {
      data.joiningDate = userData.joiningDate
        ? new Date(userData.joiningDate)
        : null;
    }

    if (userData.password && userData.password.trim() !== "") {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password; // don't overwrite with blank
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUser = async (id: number) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
