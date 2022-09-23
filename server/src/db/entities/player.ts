import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Game } from "./game";

@Entity()
export class Player {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column("varchar", { nullable: false })
  username: string;

  @OneToMany(() => Game, (games) => games.player, {
    cascade: true,
    onDelete: "CASCADE",
  })
  games: Game[];
}
