import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductAlreadyExists extends HttpException {
  constructor() {
    super('This product already exists', HttpStatus.CONFLICT);
  }
}
