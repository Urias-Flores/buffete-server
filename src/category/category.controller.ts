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

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findByID(@Param('id') id: number) {
    return await this.categoryService.findByID(id);
  }

  @Post()
  async save(@Body() category: Category) {
    return await this.categoryService.save(category);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() category: any) {
    return await this.categoryService.update(id, category);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.categoryService.delete(id);
  }
}
