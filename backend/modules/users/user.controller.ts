import * as userService from "./user.services.js";

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(parseInt(id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (req: any, res: any) => {
  const userData = req.body;
  try {
    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req: any, res: any) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const user = await userService.updateUser(parseInt(id), userData);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUser(parseInt(id));
    res.status(200).json(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
