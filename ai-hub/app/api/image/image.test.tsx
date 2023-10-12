import { POST } from './route';
import { NextApiRequest } from 'next';

// mock the auth function,as the test process will be conducted while not logged in
jest.mock('@clerk/nextjs', () => ({
  auth: jest.fn(),
}));

// creating generic request object from next's request class
const convertToRequest = (req: NextApiRequest): Request => {
  return req as unknown as Request;
};

// test the image generation function to see if it accepts the given arguments and returns http status 200
describe('POST function', () => {
  it('successfully accepts the given arguments', async () => {
    // mock the auth function return a user ID
    jest.spyOn(require('@clerk/nextjs'), 'auth').mockReturnValueOnce({ userId: 'mockedUserId' });

    // create a mock request object that emulates a POST request
    const mockReq: NextApiRequest = {
      method: 'POST',
      body: JSON.stringify({ prompt: "A bowl of cookies", amount: 1, resolution: "256x256" }),
      json: jest.fn().mockResolvedValueOnce({ prompt: "A bowl of cookies", amount: 1, resolution: "256x256" }),
    } as any;

    // call the POST function with the mock request
    const response = await POST(convertToRequest(mockReq));
    
    // expect the response of the POST function to be http status 200 (ok)
    expect(response.status).toBe(200);

  }, 12000); // it actually spends time to generate which takes ~9.5 seconds so give it 12000ms timeframe
});
