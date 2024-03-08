import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Status } from "../enum/status.enum";
import { Accounts } from "./accounts.model";
import { Sales } from "./sales.modal";


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

  @ManyToOne(() => Accounts, (account) => account.products)
  account: Accounts;

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

  @OneToMany(() => Sales, sale => sale.product)
  sales: Sales[];

}
