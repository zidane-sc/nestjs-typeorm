import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Entity({ synchronize: true })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Employee, (manager) => manager.directReports, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'manager_id' })
  manager: Employee;

  @OneToMany(() => Employee, (directReports) => directReports.manager)
  directReports: Employee[];

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee, {
    eager: true,
  })
  contactInfo: ContactInfo;

  @OneToMany(() => Task, (task) => task.employee, {
    cascade: ['insert'],
  })
  tasks: Task[];

  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable({
    name: 'employee_has_meeting',
    // joinColumn: {
    //   name: 'employee_id',
    //   referencedColumnName: 'id',
    // },
    // inverseJoinColumn: {
    //   name: 'meeting_id',
    //   referencedColumnName: 'id',
    // },
  })
  meetings: Meeting[];
}
