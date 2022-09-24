import { DataSource } from "typeorm";
import { ArtistService } from "../services/artist-service";
import artists from "./artists.json"; 
import dotenv from "dotenv"; 
//import "reflect-metadata";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_ACCOUNT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: process.env.PG_SYNCHRONIZE == "true",
  logging: process.env.PG_LOGGING == "true",
  entities: [process.env.PG_ENTITIES],
});

export const seedData = () => {
  ArtistService.listArtists().then((list) => {
    if (list.length === 0) {
      ArtistService.createBulkArtist(artists).then(
        artists => console.log("Newly inserted artists:", artists)
      )
    }
  });
};
