import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

// spies (espiões) são criados para saber se determinada função foi chamada
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
   { create: createFeedbackSpy },
   { sendMail: sendMailSpy }
);

// describe cria uma suíte de testes (categorização)
describe('Submit feedback', () => {
   it('should be able to submit a feedback', async () => {
      await expect(
         submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,8942wyt2qgohwrgoha34a9o',
         })
      ).resolves.not.toThrow();

      expect(createFeedbackSpy).toHaveBeenCalled();
      expect(sendMailSpy).toHaveBeenCalled();
   });

   it('should not be able to submit a feedback without type', async () => {
      await expect(
         submitFeedback.execute({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,8942wyt2qgohwrgoha34a9o',
         })
      ).rejects.toThrow();
   });

   it('should not be able to submit a feedback without comment', async () => {
      await expect(
         submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,8942wyt2qgohwrgoha34a9o',
         })
      ).rejects.toThrow();
   });

   it('should not be able to submit a feedback with an invalid screenshot', async () => {
      await expect(
         submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'test.jpg',
         })
      ).rejects.toThrow();
   });
});
