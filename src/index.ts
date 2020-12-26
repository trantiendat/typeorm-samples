import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";

createConnection({
  type: "postgres",
  host: "localhost",
  username: "root",
  password: "",
  database: "test",
  entities: [Photo],
  synchronize: true,
  logging: false,
})
  .then(async (connection) => {
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.fileName = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;

    await connection.manager.save(photo);

    let photoRepository = connection.getRepository(Photo);

    let photoToUpdate = await photoRepository.findOne(1);
    photoToUpdate.name = "Me, my friends and polar bears";
    await photoRepository.save(photoToUpdate);
  })
  .catch((error) => console.log(error));
