import * as vendorService from "./vendor.services";


export const getAllVendors = async (req: any, res: any) => {
  try {
    const vendors = await vendorService.getAllVendors();
    res.status(200).json(vendors);
  }
    catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getVendorById = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const vendor = await vendorService.getVendorById(parseInt(id));
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        res.status(200).json(vendor);
    }
    catch (error) {
        console.error("Error fetching vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};  


export const createVendor = async (req: any, res: any) => {
    const vendorData = req.body;
    try {
        const vendor = await vendorService.createVendor(vendorData);
        res.status(201).json(vendor);
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

