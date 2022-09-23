import { AppDataSource as db } from "../db/data-source";
import { Artist } from "../db/entities/artist";

export class ArtistService {
  static createArtist = (data: Artist): Promise<Artist> => {
    return db.getRepository(Artist).save(data);
  };

  static createBulkArtist = (data: Artist[]): Promise<Artist[]> => {
    return db.getRepository(Artist).save(data);
  };

  static findArtist = (id: number): Promise<Artist | null> => {
    return db.getRepository(Artist).findOneBy({ id });
  };

  static updateArtist = async (
    data: Partial<Artist>
  ): Promise<Artist | null> => {
    const repo = db.getRepository(Artist);
    let artist = await repo.findOneBy({ id: data.id });
    if (!artist) {
      throw new Error(` Artist with id ${data.id} to update does not exist!`);
    }
    artist = { ...artist, ...data };
    return repo.save(artist);
  };

  static listArtists = async (): Promise<Artist[]> => {
    return db.getRepository(Artist).find();
  };

  static deleteArtist = async (id: number): Promise<any> => {
    let result = await db.getRepository(Artist).delete(id);
    return result.affected;
  };
}
