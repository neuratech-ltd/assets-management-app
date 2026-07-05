import {prisma} from "../../lib/prisma"


export interface Asset {
  id: number;
  name: string;
  description: string;
  type?: string;
  price?: number;
  purchaseDate?: Date;
  modelNumber?: string;
  specifications?: string;
  imageUrl?: string;
  assignedToId?: number; 
  categoryId: number; 
  vendorId: number;
  updatedAt: Date;
}




const getAllAssets = async () => {
  try {
    const assets = await prisma.asset.findMany();
    console.log("Fetched assets:", assets); // Log the fetched assets for debugging
    return assets;
  }
    catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};

const getAssetById = async (id: number) => {
  try {
    const asset = await prisma.asset.findUnique({
        where: { id },
    });
    return asset;
  }
    catch (error) {
    console.error("Error fetching asset:", error);
    throw error;
  }
};

const createAsset = async (assetData: Asset) => {
    try {
        const newAsset = await prisma.asset.create({
            data: assetData,
        });
        return newAsset;
    }
    catch (error) {
        console.error("Error creating asset:", error);
        throw error;
    }
}

export {
  getAllAssets,
  getAssetById,
  createAsset
};