import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        tasks =>
          tasks.title.includes(search) || tasks.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const foundTask = this.tasks.find(task => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found `);
    }

    return foundTask;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const { status } = updateTaskDto;
    const task = this.getTaskById(id);
    task.status = status;

    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, status: status } : task,
    );
    return task;
  }

  deleteTask(id: string): void {
    const foundTask = this.getTaskById(id);
    const index: number = this.tasks.findIndex(
      task => task.id === foundTask.id,
    );
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }
}
