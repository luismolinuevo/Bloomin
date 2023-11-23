// __tests__/comments.test.ts
import request from 'supertest';
import app from '../server.js'; // Replace with the correct path to your Express app
import prisma from '../db';

beforeAll(async () => {
    // Setup any necessary database configurations or seed data
  });
  
  afterAll(async () => {
    // Close database connections or perform any necessary cleanup
    await prisma.$disconnect();
  });
  
  describe('Comment Routes', () => {
    it('should add a comment', async () => {
      const response = await supertest(app)
        .post('/addcomment/:postId') // Update the route accordingly
        .send({
          textbody: 'Test Comment',
        })
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN'); // Replace with a valid JWT token
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  
    it('should not add a comment with invalid data', async () => {
      const response = await supertest(app)
        .post('/addcomment/:postId') // Update the route accordingly
        .send({
          // Invalid data
        })
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN'); // Replace with a valid JWT token
  
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Error creating post');
    });
  
    it('should delete a comment', async () => {
      // Create a comment in the database first
      const newComment = await prisma.comment.create({
        data: {
          textbody: 'Test Comment',
          userId: 'testUserId',
          postId: 'testPostId',
        },
      });
  
      const response = await supertest(app)
        .delete(`/deletecomment/${newComment.id}`) // Update the route accordingly
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN'); // Replace with a valid JWT token
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  
    it('should not delete a non-existing comment', async () => {
      const response = await supertest(app)
        .delete('/deletecomment/invalidCommentId') // Provide a non-existing commentId
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN'); // Replace with a valid JWT token
  
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Unable to delete comment');
    });
  });