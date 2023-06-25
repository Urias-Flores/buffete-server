import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get()
  async findAll() {
    return await this.subcategoryService.findAll();
  }

  @Get(':id')
  async findByID(@Param('id') id: number) {
    return await this.subcategoryService.findByID(id);
  }

  @Post()
  async save(@Body() body) {
    return await this.subcategoryService.save(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body) {
    return await this.subcategoryService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.subcategoryService.delete(id);
  }
}
