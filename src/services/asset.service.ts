import { NextFunction, Request, Response } from "express";
import Asset from "../models/Asset";
import { location } from "../types";
import eventEmitter from "../util/event_emitter";

class AssetService {
  async findAllAssets(): Promise<Asset[]> {
    return await Asset.findAll({});
  }

  async findAssetById(id: string): Promise<Asset> {
    const asset = await Asset.findByPk(id);
    if(!asset) {
        throw new Error("Asset does not exist");
    }
    return asset;
  }

  async createAsset(data: {
    name: string;
    latitude: string;
    longitude: string;
  }): Promise<Asset> {
    return Asset.create(data);
  }

  async updateAssetLocation(assetId: string,data: location): Promise<Asset> {

    const asset = await Asset.findByPk(assetId);
    if(!asset) {
        throw new Error("Asset does not exist");
    }

    asset.latitude = data.latitude;
    asset.longitude = data.longitude;
    await asset.save();

    eventEmitter.emit('location_change', asset);
    
    return asset;
  }
}

export default AssetService;
