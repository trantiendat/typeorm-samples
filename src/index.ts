import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";

createConnection()
  .then(async (connection) => {
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.fileName = "photo-with-bears.jpg";
    photo.views = 10;
    photo.isPublished = true;

    let metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot2";
    metadata.orientation = "portrait";

    photo.metadata = metadata;

    let photoRepository = connection.getRepository(Photo);
    await photoRepository.save(photo);
    console.log("Photo is saved, photo metadata is saved too.");

    const photos = await photoRepository.find({ relations: ["metadata"] });
    console.log(photos);
  })
  .catch((error) => console.log(error));
