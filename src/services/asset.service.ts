import { NextFunction, Request, Response } from "express";
import Asset from "../models/Asset";

class AssetService {
  async findAllAssets(): Promise<Asset[]> {
    return await Asset.findAll({});
  }
  async createAsset(data: {
    name: string;
    latitude: string;
    longitude: string;
  }): Promise<Asset> {
    return Asset.create(data);
  }

  async updateAssetLocation(assetId: string,data: {
    latitude: string;
    longitude: string;
  }): Promise<Asset> {

    const asset = await Asset.findByPk(assetId);
    if(!asset) {
        throw new Error("Asset does not exist");
    }

    asset.latitude = data.latitude;
    asset.longitude = data.longitude;
    await asset.save();
    return asset;
  }
}

export default AssetService;
