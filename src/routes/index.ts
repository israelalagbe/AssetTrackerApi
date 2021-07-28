import { Router } from "express";
import { assetController, assetTrackerController } from "../controllers";
import createAssetValidator from "../validators/create_asset.validator";
import updateAssetValidator from "../validators/update_asset.validator copy";

const router = Router();



router.get("/assets", assetController.getAssets);
router.post("/assets", createAssetValidator(), assetController.createAsset);
router.put("/assets/:id/location", updateAssetValidator(), assetController.updateAssetLocation);

router.ws('/assets/:id/track', assetTrackerController.connect);

export default router;
