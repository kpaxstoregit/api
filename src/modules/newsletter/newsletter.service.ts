import { ConflictException, Injectable } from '@nestjs/common';

import { NewsletterRepository } from 'src/shared/database/repositories/newsletter.repositories';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';

@Injectable()
export class NewsletterService {
  constructor(private readonly newsletterRepository: NewsletterRepository) {}

  async subscribe(createNewsletterDto: CreateNewsletterDto) {
    const { email } = createNewsletterDto;

    const existingSubscription = await this.newsletterRepository.findMany();
    const emailExists = existingSubscription.some(
      (subscription) => subscription.email === email,
    );

    if (emailExists) {
      throw new ConflictException('Este email já está inscrito na newsletter');
    }

    return this.newsletterRepository.create({
      data: {
        email,
        createdAt: new Date(),
      },
    });
  }

  async getSubscribers() {
    const subscribers = await this.newsletterRepository.findMany();
    return {
      data: subscribers,
    };
  }
}
