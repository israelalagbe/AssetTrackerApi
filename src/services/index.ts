import AssetService from "./asset.service";
import AssetTrackerService from "./asset_tracker.service";


export const assetService = new AssetService();
export const assetTrackerService = new AssetTrackerService(assetService);