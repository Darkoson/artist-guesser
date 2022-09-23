import express from "express";
import { AppDataSource } from "./db/data-source";
import appRoutes from "./routing";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(appRoutes);

app.listen({ port: process.env.SERVER_PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("successfully connected to database");
  })
  .catch((error) => console.log(error));
