import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";

createConnection()
  .then(async (connection) => {
    let photos = await connection
      .getRepository(Photo)
      .createQueryBuilder("photo")
      .innerJoinAndSelect("photo.metadata", "metadata")
      .getMany();
    console.log(photos);
  })
  .catch((error) => console.log(error));
