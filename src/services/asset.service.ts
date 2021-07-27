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
}

export default AssetService;
