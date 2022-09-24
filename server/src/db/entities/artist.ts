import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Artist {
  @PrimaryColumn({ type: "bigint" })
  id: number;

  @Column("varchar", { nullable: false })
  name: string;

}

