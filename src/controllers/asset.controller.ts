import { NextFunction, Request, Response } from "express";
import AssetService from "../services/asset.service";

class AssetController {
  public assetService = new AssetService();

  public getAssets = async (req: Request, res: Response, next: NextFunction) => {
    const assets = await this.assetService.findAllAssets();
    return res.status(200).json(assets);
  };

  public createAsset = async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };

    const asset = await this.assetService.createAsset(payload);
    
    return res.status(201).json(asset);
  };
}

export default AssetController;
