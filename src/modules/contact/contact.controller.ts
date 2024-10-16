import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @IsPublic()
  async createContact(@Body() createContactDto: CreateContactDto) {
    return this.contactService.createContact(createContactDto);
  }

  @Get()
  @IsPublic()
  async getAllContacts() {
    return this.contactService.getAllContacts();
  }
}
