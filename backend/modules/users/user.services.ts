import { prisma } from "../../lib/prisma";


interface User {
  id: number;
  email: string;
  password: string;
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

    console.log("Fetched users:", users); // Log the fetched users for debugging
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserById = async (id: number) => { 

    try{
        const user = await prisma.user.findUnique({
      where: { id },
      
    });
    return user;
    }
    
  catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const createUser = async (userData: User) => {
  try {
    const newUser = await prisma.user.create({
        data: userData,
    });
    return newUser;
  }
    catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


export {
  getAllUsers,
  getUserById,
  createUser,
};