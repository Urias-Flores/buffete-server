import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findByID(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.findByID(id);
  }

  @Post()
  async save(@Body() category: Category): Promise<Category> {
    return await this.categoryService.save(category);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() category: any,
  ): Promise<UpdateResult> {
    return await this.categoryService.update(id, category);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.categoryService.delete(id);
  }
}
