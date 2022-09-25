import express from "express"; 
import * as Ctrl from "./controllers";

const router = express.Router();
 

// artist routes
router.post("/games", Ctrl.postGame);

router.post("/artists", Ctrl.postArtist);
router.post("/artists/bulk", Ctrl.postBulkArtist);
router.get("/artists", Ctrl.getAllArtists);
router.get("/artists/:id", Ctrl.getArtist);
router.put("/artists/:id", Ctrl.updateArtist);
router.delete("/artists/:id", Ctrl.deleteArtist);

export default router;
