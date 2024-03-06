import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Accounts } from "./accounts.model";
import { Status } from "../enum/status.enum";

@Entity()
export class AccountsToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  pushToken: string;

  @Column({ nullable: true })
  authToken: string;

  @Column({
    length: 50,
  })
  version: string;

  @ManyToOne(() => Accounts, (account) => account.tokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  account: Accounts;

  @Column()
  lastUsed: Date;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
