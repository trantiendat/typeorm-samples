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
  .then(async (connection) => {})
  .catch((error) => console.log(error));
