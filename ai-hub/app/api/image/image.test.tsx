import { POST } from './route';
import { NextApiRequest } from 'next';

// mock the auth function
jest.mock('@clerk/nextjs', () => ({
  auth: jest.fn(),
}));

// mock the OpenAI client
jest.mock('openai', () => ({
  OpenAI: jest.fn(() => ({
    apiKey: 'mockedApiKey',
  })),
}));

// creating generic request object from next's request class
const convertToRequest = (req: NextApiRequest): Request => {
  return req as unknown as Request;
};

// test the image generation function to see if it accepts the given arguments
describe('POST function', () => {
  it('successfully accepts the given arguments', async () => {
    // mock the auth function return a user ID
    jest.spyOn(require('@clerk/nextjs'), 'auth').mockReturnValueOnce({ userId: 'mockedUserId' });

    // create a mock request object that emulates a POST request with dummy response data
    const mockReq: NextApiRequest = {
      method: 'POST',
      body: JSON.stringify({ prompt: "A bowl of cookies", amount: 1, resolution: "256x256" }),
      json: jest.fn().mockResolvedValueOnce({ response: [] }),
    } as any;

    // create a mock of the image gen POST function
    const mockPost = jest.fn(POST);

    // call the POST function with the mock request
    await mockPost(convertToRequest(mockReq));

    // check that the auth function was called
    expect(require('@clerk/nextjs').auth).toHaveBeenCalled();

    // check that the POST function was called
    expect(mockPost).toHaveBeenCalled();
  });
});
