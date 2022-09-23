import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column("varchar", { nullable: false })
  name: string;

}

