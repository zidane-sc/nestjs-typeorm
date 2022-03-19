import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRespository.find({
      relations: ['pets'],
    }); // SELECT * from user
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRespository.findOneOrFail(id); // SELECT * from user WHERE id = id;
      return user;
    } catch (error) {
      // handle error
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
