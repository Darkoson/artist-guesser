import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Player } from "./player";

@Entity()
export class Game {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column("int4", { default: 5 })
  completedRound: number;

  @Column("int4", { default: 5 })
  scores: number;

  @ManyToOne(()=>Player , player=>player.games, {cascade: true})
  player: Player;
}

