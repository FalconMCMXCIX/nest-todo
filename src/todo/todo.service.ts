import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TodoService {

  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      return await this.prisma.todo.create({
        data: {
          ...createTodoDto
        }
      });
    }
    catch(error) {
      throw new BadRequestException(
        `Request was not correctly,
         Please retry again`
      )
    }
   
  }

  async findAll() {
    try {
      const todo = await this.prisma.todo.findMany();
      if (!todo) {
        return {
          message: `Todo's does not exist`
        }
      }
      return todo
    }
    catch (error) {
      throw new NotFoundException(`The record searched does not exist in current database`)
    }
  }

  async findOne(id: number) {
    try {
      const todo =  await this.prisma.todo.findUnique({
        where: {
          id: id
        },
      })
      if (!todo) {
        return {
          message: `Todo was not found or does not exist with current id: ${ id }`
        }
      }
      return todo
    }
    catch (error) {
      throw new NotFoundException(`The record searched for in where ${ id } does not exist in current database`)
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.prisma.todo.update({
        where: {
          id: id
        },
        data: {
          ...updateTodoDto
        }
      })
      if (!todo) {
        return {
          message: `Todo was not found`
        }
      }
      return todo
    }
    catch (error) {
      throw new NotFoundException(`The record searched for in where ${ id } does not exist in current database`)
    }
  
  }

  async remove(id: number) {
    try {
      const todo =  await this.prisma.todo.delete({
        where: {
          id: id
        }
      });
      if (!todo) {
        return {
          message: `Todo was not found`
        }
      }
      return todo
    }
    catch (error) {
      throw new NotFoundException(`The record searched for in where ${ id } does not exist in current database`)
    }

  }
}
