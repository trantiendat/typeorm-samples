import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Album } from "./entity/Album";

createConnection()
  .then(async (connection) => {
    let album1 = new Album();
    album1.name = "Bears";

    await connection.manager.save(album1);

    let album2 = new Album();
    album2.name = "Me";
    await connection.manager.save(album2);

    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.fileName = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;
    photo.albums = [album1, album2];
    await connection.manager.save(photo);

    const loadedPhoto = await connection
      .getRepository(Photo)
      .findOne(photo.id, { relations: ["albums"] });

    console.log(loadedPhoto);
  })
  .catch((error) => console.log(error));
