import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;

  @Column()
  fileName: string;

  @Column("integer")
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne((type) => PhotoMetadata, (photometadata) => photometadata.photo, {
    cascade: true,
  })
  metadata: PhotoMetadata;
}
