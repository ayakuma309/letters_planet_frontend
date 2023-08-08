import { z } from 'zod';

const CommentSchema = z.object({
  postId: z.string(),
  content: z.string().max(80),
});

export { CommentSchema };
