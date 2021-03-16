import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto) {
    const newSchool: School = plainToClass(School, createSchoolDto);
    return this.schoolRepository.save(newSchool);
  }

  findAll(): Promise<School[]> {
    return this.schoolRepository.find();
  }

  findOne(id: number) {
    return this.schoolRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.schoolRepository.delete(id);
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto) {
    const modifiedSchool = await this.schoolRepository.findOne(id);
    modifiedSchool.firstName = updateSchoolDto.firstName;
    modifiedSchool.lastName = updateSchoolDto.lastName;
  }
}
