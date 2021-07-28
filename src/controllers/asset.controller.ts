import { NextFunction, Request, Response } from "express";
import AssetService from "../services/asset.service";

class AssetController {
  constructor(public assetService: AssetService) {}

  public getAssets = async (req: Request, res: Response, next: NextFunction) => {
    const assets = await this.assetService.findAllAssets();
    return res.status(200).json(assets);
  };

  public createAsset = async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };

    const asset = await this.assetService.createAsset(payload);

    return res.status(201).json({ data: asset });
  };

  public updateAssetLocation = async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      latitude: String(req.body.latitude),
      longitude: String(req.body.longitude),
    };
    const assetId = req.params.id;

    try {
      const asset = await this.assetService.updateAssetLocation(assetId, payload);
      return res.status(201).json({ data: asset });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
}

export default AssetController;
