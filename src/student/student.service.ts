import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { Student } from './entities/student.entity';
import { type } from 'os';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    /**
     * 캐시 사용을 위해 의존 주입
     */
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    await this.studentRepository.save(createStudentDto);
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    const value: Student = await this.cacheManager.get(String(id));
    if (value instanceof Student) return value;
    const student: Student = await this.studentRepository.findOne(id);
    this.cacheManager.set(id + '', student, { ttl: 1000 });
    return student;
  }

  async remove(id: number) {
    const student: Student = await this.studentRepository.findOne(id);
    await this.studentRepository.remove(student);
  }
}
