import { assetService, assetTrackerService } from "../services";
import AssetController from "./asset.controller";
import AssetTrackerController from "./asset_tracker.controller";


export const assetController = new AssetController(assetService);
export const assetTrackerController = new AssetTrackerController(assetTrackerService);