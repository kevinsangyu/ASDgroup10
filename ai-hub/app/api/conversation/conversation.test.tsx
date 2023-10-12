import { POST } from './route';
import { NextApiRequest, NextApiResponse } from 'next';

//mock clerk auth
jest.mock('@clerk/nextjs', () => ({
  auth: jest.fn(),
}));
//mock openai
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn(() => ({
      apiKey: 'mockedApiKey',
      chat: {
        completions: {
          create: jest.fn().mockImplementation(async (params) => ({
            choices: [
              {
                message: 'Mocked response for testing.',
              },
            ],
          })),
        },
      },
    })),
  };
});

// Convert NextApiRequest to a generic Request
const convertToRequest = (req: NextApiRequest): Request => {
  return req as unknown as Request;
};

describe('POST function', () => {
  it('returns the expected response for a valid request', async () => {
    // Mock auth function to return a userId
    jest.spyOn(require('@clerk/nextjs'), 'auth').mockReturnValueOnce({ userId: 'mockedUserId' });

    // Create a mock request
    const mockReq: NextApiRequest = {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] }),
      json: jest.fn().mockResolvedValueOnce({ messages: [] }), // Add a mock json method
    } as any; // 

    // Call the POST function
    await POST(convertToRequest(mockReq));

    expect(require('@clerk/nextjs').auth).toHaveBeenCalled();

  });

});
