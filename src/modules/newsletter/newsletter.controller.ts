import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @IsPublic()
  async subscribe(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.subscribe(createNewsletterDto);
  }

  @Get('subscribers')
  @IsPublic()
  async getSubscribers() {
    return this.newsletterService.getSubscribers();
  }
}
