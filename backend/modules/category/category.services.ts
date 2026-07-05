import {prisma} from "../../lib/prisma"


interface AssetCategory {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}


const getAllCategories = async () => {
  try {
    const categories = await prisma.assetCategory.findMany();
    console.log("Fetched categories:", categories); // Log the fetched categories for debugging
    return categories;
  }
    catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const getCategoryById = async (id: number) => {
  try {
    const category = await prisma.assetCategory.findUnique({
        where: { id },
    });
    return category;
  }
    catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

const createCategory = async (categoryData: AssetCategory) => {
    try {
        const newCategory = await prisma.assetCategory.create({
            data: categoryData,
        });
        return newCategory;
    }
    catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
}

export {
  getAllCategories,
  getCategoryById,
  createCategory
};