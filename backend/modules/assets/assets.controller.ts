import * as assetService from "./asstets.services";

export const getAllAssets = async (req: any, res: any) => {
  try {
    const assets = await assetService.getAllAssets();
    res.status(200).json(assets);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAssetById = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const asset = await assetService.getAssetById(parseInt(id));
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.status(200).json(asset);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createAsset = async (req: any, res: any) => {
  const assetData = req.body;
  try {
    const asset = await assetService.createAsset(assetData);
    res.status(201).json(asset);
  } catch (error) {
    console.error("Error creating asset:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAsset = async (req: any, res: any) => {
  const { id } = req.params;
  const assetData = req.body;
  try {
    const asset = await assetService.updateAsset(parseInt(id), assetData);
    res.status(200).json(asset);
  } catch (error) {
    console.error("Error updating asset:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAsset = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const asset = await assetService.deleteAsset(parseInt(id));
    res.status(200).json(asset);
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
};
