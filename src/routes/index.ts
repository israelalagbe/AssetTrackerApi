import { Router } from "express";
import AssetController from "../controllers/asset.controller";
import createAssetValidator from "../validators/create_asset.validator";

const router = Router();

const assetController = new AssetController();

router.get("/assets", assetController.getAssets);
router.post("/assets", createAssetValidator(), assetController.createAsset);

export default router;
