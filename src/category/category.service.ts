import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['Subcategories', 'User'],
      order: { CategoryID: 'ASC' },
    });
  }

  async findByID(CategoryID: number) {
    return await this.categoryRepository.findOneBy({ CategoryID });
  }

  async save(category: Category): Promise<Category> {
    category.CreatedDate = new Date();
    category.UpdatedDate = new Date();
    return await this.categoryRepository.save(category);
  }

  async update(CategoryID: number, category: Category) {
    category.UpdatedDate = new Date();
    return await this.categoryRepository.update({ CategoryID }, category);
  }

  async delete(CategoryID: number) {
    return await this.categoryRepository.delete(CategoryID);
  }
}
