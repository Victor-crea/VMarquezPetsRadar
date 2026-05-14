import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLostPetDto } from './dto/create-lost-pet.dto';
import { LostPetsService } from './lost-pets.service';

@Controller('lost-pets')
export class LostPetsController {
  constructor(private readonly lostPetsService: LostPetsService) {}

  @Get()                                   // <-- NUEVO
  async findAll() {
    return await this.lostPetsService.findAllActive();
  }

  @Post()
  async create(@Body() dto: CreateLostPetDto) {
    return await this.lostPetsService.create(dto);
  }
}