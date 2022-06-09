import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
   type: string;
   comment: string;
   screenshot?: string;
}

export class SubmitFeedbackUseCase {
   private feedbacksRepository: FeedbacksRepository;
   private mailAdapter: MailAdapter;

   constructor(
      feedbacksRepository: FeedbacksRepository,
      mailAdapter: MailAdapter
   ) {
      this.feedbacksRepository = feedbacksRepository;
      this.mailAdapter = mailAdapter;
   }

   async execute(request: SubmitFeedbackUseCaseRequest) {
      const { type, comment, screenshot } = request;

      if (!type) {
         throw new Error('Type is required.');
      }

      if (!comment) {
         throw new Error('Comment is required.');
      }

      if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
         throw new Error('Invalid screenshot format.');
      }

      // salvar no banco de dados
      await this.feedbacksRepository.create({ type, comment, screenshot });
      // enviar por e-mail
      await this.mailAdapter.sendMail({
         subject: 'Novo feedback',
         body: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            screenshot
               ? `<img style="max-width: 100%" src="${screenshot}" />`
               : '',
            `</div>`,
         ].join('\n'),
      });
   }
}
