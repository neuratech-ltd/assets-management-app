import * as categoryService from "./category.services";


export const getAllCategories = async (req: any, res: any) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  }
    catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCategoryById = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const category = await categoryService.getCategoryById(parseInt(id));
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(category);
    }
    catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};  


export const createCategory = async (req: any, res: any) => {
    const categoryData = req.body;
    try {
        const category = await categoryService.createCategory(categoryData);
        res.status(201).json(category);
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

