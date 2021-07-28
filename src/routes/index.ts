import { Router } from "express";
import AssetController from "../controllers/asset.controller";
import createAssetValidator from "../validators/create_asset.validator";
import updateAssetValidator from "../validators/update_asset.validator copy";

const router = Router();

const assetController = new AssetController();

router.get("/assets", assetController.getAssets);
router.post("/assets", createAssetValidator(), assetController.createAsset);
router.put("/assets/:id/location", updateAssetValidator(), assetController.updateAssetLocation);

export default router;
