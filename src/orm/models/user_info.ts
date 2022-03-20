import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from "typeorm";

@Entity()
export class UserInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    full_name!: string;

    @Column({ nullable: true })
    email_address!: string;

    @Column({ nullable: true })
    phone_number!: string;

    @Column({ nullable: true })
    industry!: string;

    @Column({ nullable: true })
    demo_product_type!: string;

    @Column({ nullable: true })
    total_employees!: number;

    @Column({ nullable: true })
    metrics!: string

    @CreateDateColumn()
    createdAt!: Date;
}