import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Games {
  @PrimaryColumn({ type: "varchar" })
  username: string;

  @Column("int4", { default: 5 })
  roundsCompleted: number;

  @Column("int4", { default: 0 })
  scores: number;

  @Column("int4", { default: 0 })
  gamesCount: number;
}
