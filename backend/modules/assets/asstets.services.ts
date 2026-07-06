import { prisma } from "../../lib/prisma";

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
    const assets = await prisma.asset.findMany({
      include: {
        vendor: true,
        category: true,
        assignedTo: true,
      },
    });
    return assets;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};

const getAssetById = async (id: number) => {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        vendor: true,
        category: true,
        assignedTo: true,
      },
    });
    return asset;
  } catch (error) {
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
  } catch (error) {
    console.error("Error creating asset:", error);
    throw error;
  }
};

const updateAsset = async (id: number, assetData: Asset) => {
  try {
    const updatedAsset = await prisma.asset.update({
      where: { id },
      data: assetData,
    });
    return updatedAsset;
  } catch (error) {
    console.error("Error updating asset:", error);
    throw error;
  }
};

const deleteAsset = async (id: number) => {
  try {
    const deletedAsset = await prisma.asset.delete({
      where: { id },
    });
    return deletedAsset;
  } catch (error) {
    console.error("Error deleting asset:", error);
    throw error;
  }
};

export { getAllAssets, getAssetById, createAsset, updateAsset, deleteAsset };
