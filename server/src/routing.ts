import express from "express"; 
import * as ArtistCtrl from "./controllers/artist-controller";

const router = express.Router();
 

// artist routes
router.post("/artists", ArtistCtrl.postArtist);
router.post("/artists/bulk", ArtistCtrl.postBulkArtist);
router.get("/artists", ArtistCtrl.getAllArtists);
router.get("/artists/:id", ArtistCtrl.getArtist);
router.put("/artists/:id", ArtistCtrl.updateArtist);
router.delete("/artists/:id", ArtistCtrl.deleteArtist);

export default router;
