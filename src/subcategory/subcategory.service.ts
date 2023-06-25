import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './subcategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

  async findAll(): Promise<Subcategory[]> {
    return await this.subcategoryRepository.find({
      relations: ['Category', 'Documents'],
      order: { SubcategoryID: 'ASC' },
    });
  }

  async findByID(SubcategoryID: number) {
    return await this.subcategoryRepository.findOneBy({ SubcategoryID });
  }

  async save(subcategory: Subcategory): Promise<Subcategory> {
    subcategory.CreatedDate = new Date();
    subcategory.UpdatedDate = new Date();
    return await this.subcategoryRepository.save(subcategory);
  }

  async update(SubcategoryID: number, subcategory: Subcategory) {
    subcategory.UpdatedDate = new Date();
    return await this.subcategoryRepository.update(
      { SubcategoryID },
      subcategory,
    );
  }

  async delete(SubcategoryID: number) {
    return await this.subcategoryRepository.delete(SubcategoryID);
  }
}
