import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Album } from "./entity/Album";

createConnection()
  .then(async (connection) => {
    let photos = await connection
      .getRepository(Photo)
      .createQueryBuilder("photo")
      .innerJoinAndSelect("photo.metadata", "metadata")
      .leftJoinAndSelect("photo.albums", "album")
      .where("photo.isPublished = true")
      .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
      .orderBy("photo.id", "DESC")
      .skip(5)
      .take(10)
      .setParameters({ photoName: "Me and Bears", bearName: "Mishka" })
      .getMany();
    console.log(photos);
  })
  .catch((error) => console.log(error));
