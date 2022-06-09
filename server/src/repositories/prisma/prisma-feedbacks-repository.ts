import { prisma } from '../../prisma';
import {
   FeedbackCreateData,
   FeedbacksRepository,
} from '../feedbacks-repository';

// implementa as operações que serão usadas no banco de dados
export class PrismaFeedbacksRepository implements FeedbacksRepository {
   async create({ type, comment, screenshot }: FeedbackCreateData) {
      await prisma.feedback.create({
         data: {
            type,
            comment,
            screenshot,
         },
      });
   }
}
