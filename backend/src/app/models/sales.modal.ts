import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../enum/status.enum";
import { Products } from "./products.model";
import { Orders } from "./orders.modal";


@Entity()
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  prices: number

  @Column()
  quantity: number

  @ManyToOne(() => Products, (product) => product.sales)
  product: Products;

  @ManyToOne(() => Orders, (order) => order.sales)
  order: Orders;

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
