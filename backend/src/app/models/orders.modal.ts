import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../enum/status.enum";
import { Accounts } from "./accounts.model";
import { Sales } from "./sales.modal";


@Entity()
export class Orders extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  total: number

  @ManyToOne(() => Accounts, (account) => account.orders)
  account: Accounts;

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

  @OneToMany(() => Sales, sale => sale.order)
  sales: Sales[];

}
