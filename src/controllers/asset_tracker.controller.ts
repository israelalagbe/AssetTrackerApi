import { NextFunction, Request, Response } from "express";
import * as ws from "ws";
import AssetService from "../services/asset.service";
import AssetTrackerService from "../services/asset_tracker.service";

class AssetTrackerController {
  constructor(public assetTrackerService: AssetTrackerService) {}

  public connect = async (client: ws, req: Request, next: NextFunction) => {
    const assetId = req.params.id;
    const clientLocation = {
      latitude: req.query.client_latitude as string,
      longitude: req.query.client_longitude as string,
    };
    
    try {
      await this.assetTrackerService.track(assetId, client, clientLocation);
    } catch (e) {
      client.send(
        JSON.stringify({
          event: "error",
          data: e.message,
        })
      );
      client.close();
    }
  };
}

export default AssetTrackerController;
