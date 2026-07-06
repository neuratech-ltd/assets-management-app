import { prisma } from "../../lib/prisma";

interface Vendor {
  id: number;
  name: string;
  contactInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const getAllVendors = async () => {
  try {
    const vendors = await prisma.vendor.findMany();
    console.log("Fetched vendors:", vendors); // Log the fetched vendors for debugging
    return vendors;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};

const getVendorById = async (id: number) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
    });
    return vendor;
  } catch (error) {
    console.error("Error fetching vendor:", error);
    throw error;
  }
};

const createVendor = async (vendorData: Vendor) => {
  try {
    const newVendor = await prisma.vendor.create({
      data: vendorData,
    });
    return newVendor;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error;
  }
};

const updateVendor = async (id: number, vendorData: Partial<Vendor>) => {
  try {
    const updatedVendor = await prisma.vendor.update({
      where: { id },
      data: vendorData,
    });
    return updatedVendor;
  } catch (error) {
    console.error("Error updating vendor:", error);
    throw error;
  }
};

const deleteVendor = async (id: number) => {
  try {
    const deletedVendor = await prisma.vendor.delete({
      where: { id },
    });
    return deletedVendor;
  } catch (error) {
    console.error("Error deleting vendor:", error);
    throw error;
  }
};

export {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
};
