import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>,
    @InjectRepository(Employee)
    private employeesRespository: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfosRespository: Repository<ContactInfo>,
    @InjectRepository(Meeting)
    private meetingsRespository: Repository<Meeting>,
    @InjectRepository(Task)
    private tasksRespository: Repository<Task>,
  ) {}

  async seed() {
    // Employee 1 CEO
    const ceo = this.employeesRespository.create({ name: 'Mr. CEO' });
    await this.employeesRespository.save(ceo);

    const ceoContactInfo = this.contactInfosRespository.create({
      email: 'email@email.com',
      // employeeId: ceo.id,
    });
    ceoContactInfo.employee = ceo;
    await this.contactInfosRespository.save(ceoContactInfo);

    // Employee 2 manager
    const manager = this.employeesRespository.create({
      name: 'Marius',
      manager: ceo,
    });
    // await this.employeesRespository.save(manager);

    const task1 = this.tasksRespository.create({
      title: 'Hire people',
    });
    // await this.tasksRespository.save(task1);

    const task2 = this.tasksRespository.create({
      title: 'Present to CEO',
    });
    // await this.tasksRespository.save(task2);

    manager.tasks = [task1, task2];

    const meeting1 = this.meetingsRespository.create({
      zoomUrl: 'https://zoom.us/j/123456789',
    });
    meeting1.attendees = [ceo];
    await this.meetingsRespository.save(meeting1);

    manager.meetings = [meeting1];

    await this.employeesRespository.save(manager);
  }

  // Employee
  getEmployeeById(id: number) {
    return this.employeesRespository.findOne(id, {
      relations: [
        'manager',
        'directReports',
        'contactInfo',
        'tasks',
        'meetings',
      ],
    });

    // const employee =  this.employeesRespository
    //   .createQueryBuilder('employee')
    //   .leftJoinAndSelect('employee.directReports', 'directReports')
    //   .leftJoinAndSelect('employee.meetings', 'meetings')
    //   .leftJoinAndSelect('employee.tasks', 'tasks')
    //   .where('employee.id = :id', { id })
    //   .getOne();

    // return employee;
  }

  async deleteEmployee(id: number): Promise<Employee> {
    const employee = await this.employeesRespository.findOne(id);
    return this.employeesRespository.remove(employee);
  }

  getAll(): Promise<User[]> {
    return this.usersRespository.find({
      relations: ['pets'],
    }); // SELECT * from user
  }

  async getOneById(id: number): Promise<User> {
    try {
      return await this.usersRespository.findOneOrFail(id); // SELECT * from user WHERE id = id;
    } catch (error) {
      // handle error
      console.log(error);
      throw error;
    }
  }

  createUser(name: string): Promise<User> {
    const newUser = this.usersRespository.create({ name });

    return this.usersRespository.save(newUser);
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);

    user.name = name;

    return this.usersRespository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);

    return this.usersRespository.remove(user);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
