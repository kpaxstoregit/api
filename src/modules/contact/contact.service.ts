import { Get, Injectable } from '@nestjs/common';
import { ContactRepository } from 'src/shared/database/repositories/contact.repository';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { CreateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async createContact(createContactDto: CreateContactDto) {
    const { name, email, message } = createContactDto;

    return await this.contactRepository.create({
      data: {
        name,
        email,
        message,
        createdAt: new Date(),
      },
    });
  }

  @Get()
  @IsPublic()
  async getAllContacts() {
    const contacts = await this.contactRepository.findMany();
    return { data: contacts };
  }
}
