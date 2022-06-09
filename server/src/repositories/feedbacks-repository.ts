export interface FeedbackCreateData {
   type: string;
   comment: string;
   screenshot?: string;
}

// descreve as operações que serão usadas no banco de dados
export interface FeedbacksRepository {
   create: (data: FeedbackCreateData) => Promise<void>;
}
