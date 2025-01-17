import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_id' })
  id: number;

  @Column({ nullable: false, default: '' })
  username: string;

  @Column({ name: 'email', nullable: false, default: '' })
  email: string;

  @Column({ nullable: false, default: '' })
  password: string;
}
