import { POST } from './route';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@clerk/nextjs', () => ({
  auth: jest.fn(),
}));

jest.mock('openai', () => ({
  OpenAI: jest.fn(() => ({
    apiKey: 'mockedApiKey',
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: 'Mocked response for testing.',
            },
          ],
        }),
      },
    },
  })),
}));

// Convert NextApiRequest to a generic Request
const convertToRequest = (req: NextApiRequest): Request => {
  return req as unknown as Request;
};

describe('POST function', () => {
  it('successfully runs with matching input structure', async () => {
    // Mock auth function to return a userId
    jest.spyOn(require('@clerk/nextjs'), 'auth').mockReturnValueOnce({ userId: 'mockedUserId' });

    // Create a mock request
    const mockReq: NextApiRequest = {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] }),
      json: jest.fn().mockResolvedValueOnce({ messages: [] }), // Add a mock json method
    } as any;

    // Mock the actual POST function
    const mockPost = jest.fn(POST);

    // Call the mocked POST function
    await mockPost(convertToRequest(mockReq));

    // Check if auth and POST have been successfully called
    expect(require('@clerk/nextjs').auth).toHaveBeenCalled();
    expect(mockPost).toHaveBeenCalled();
    
  });
});
