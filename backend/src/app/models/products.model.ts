import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Status } from "../enum/status.enum";
import { Accounts } from "./accounts.model";

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: String;

  @Column()
  sku: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "float" })
  prices: number;

  @Column({ default: false })
  tax: boolean;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedAt: Date;

  @ManyToOne(() => Accounts, (account) => account.products)
  account: Accounts;
}
