import { prisma } from "../../lib/prisma";

export interface Asset {
  id: number;
  name: string;
  description: string;
  type?: string;
  price?: number;
  quantity?: number;
  purchaseDate?: Date;
  modelNumber?: string;
  specifications?: string;
  imageUrl?: string;
  categoryId: number;
  vendorId: number;
  updatedAt: Date;
}

export interface AssetInput extends Omit<Asset, "id" | "updatedAt"> {
  assignedUserIds?: number[];
}

const getAllAssets = async () => {
  try {
    const assets = await prisma.asset.findMany({
      include: {
        vendor: true,
        category: true,
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
        assignments: {
          include: { user: true },
        },
      },
    });
    return asset;
  } catch (error) {
    console.error("Error fetching asset:", error);
    throw error;
  }
};

const createAsset = async (assetData: AssetInput) => {
  const { assignedUserIds, ...assetFields } = assetData;

  if (
    assignedUserIds &&
    assetFields.quantity != null &&
    assignedUserIds.length > assetFields.quantity
  ) {
    throw new Error(
      `Cannot assign ${assignedUserIds.length} users; only ${assetFields.quantity} unit(s) available.`,
    );
  }

  try {
    const newAsset = await prisma.asset.create({
      data: {
        ...assetFields,
        assignments: assignedUserIds
          ? {
              create: assignedUserIds.map((userId) => ({ userId })),
            }
          : undefined,
      },
      include: {
        vendor: true,
        category: true,
        assignments: { include: { user: true } },
      },
    });
    return newAsset;
  } catch (error) {
    console.error("Error creating asset:", error);
    throw error;
  }
};

const updateAsset = async (id: number, assetData: AssetInput) => {
  const { assignedUserIds, ...assetFields } = assetData;

  try {
    const updatedAsset = await prisma.$transaction(async (tx) => {
      const asset = await tx.asset.update({
        where: { id },
        data: assetFields,
      });

      if (assignedUserIds) {
        if (asset.quantity != null && assignedUserIds.length > asset.quantity) {
          throw new Error(
            `Cannot assign ${assignedUserIds.length} users; only ${asset.quantity} unit(s) available.`,
          );
        }

        await tx.assetAssignment.updateMany({
          where: {
            assetId: id,
            returnedAt: null,
            userId: { notIn: assignedUserIds },
          },
          data: { returnedAt: new Date() },
        });

        const activeAssignments = await tx.assetAssignment.findMany({
          where: { assetId: id, returnedAt: null },
          select: { userId: true },
        });
        const activeUserIds = new Set(activeAssignments.map((a) => a.userId));
        const newUserIds = assignedUserIds.filter(
          (uid) => !activeUserIds.has(uid),
        );

        if (newUserIds.length > 0) {
          await tx.assetAssignment.createMany({
            data: newUserIds.map((userId) => ({ assetId: id, userId })),
            skipDuplicates: true,
          });
        }
      }

      return tx.asset.findUnique({
        where: { id },
        include: {
          vendor: true,
          category: true,
          assignments: { include: { user: true } },
        },
      });
    });

    return updatedAsset;
  } catch (error) {
    console.error("Error updating asset:", error);
    throw error;
  }
};

const deleteAsset = async (id: number) => {
  try {
    const deletedAsset = await prisma.$transaction(async (tx) => {
      await tx.assetAssignment.deleteMany({ where: { assetId: id } });
      return tx.asset.delete({ where: { id } });
    });
    return deletedAsset;
  } catch (error) {
    console.error("Error deleting asset:", error);
    throw error;
  }
};

export { getAllAssets, getAssetById, createAsset, updateAsset, deleteAsset };
