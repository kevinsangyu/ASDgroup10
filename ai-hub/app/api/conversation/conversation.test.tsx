// this is so that the test environment has access to process.env file for the API keys.
// it is before the imports because when importing POST it throws an error because it cant find the api keys in the .env file
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

import { POST } from './route';
import { NextApiRequest } from 'next';

jest.mock('@clerk/nextjs', () => ({
  ...jest.requireActual('@clerk/nextjs'), // Use the actual implementation for other exports
  auth: jest.fn(() => ({ userId: 'mockedUserId' })),
}));


// creating generic request object from next's request class
const convertToRequest = (req: NextApiRequest): Request => {
  return req as unknown as Request;
};

// test the image generation function to see if it accepts the given arguments and returns http status 200
describe('POST function', () => {
  it('successfully accepts the given arguments and validates the status of the API key', async () => {
    // mock the auth function return a user ID
    jest.spyOn(require('@clerk/nextjs'), 'auth').mockReturnValueOnce({ userId: 'mockedUserId' });

    // create a mock request object that emulates a POST request with the required arguments
    const mockReq: NextApiRequest = {
      method: 'POST',
      json: jest.fn().mockResolvedValueOnce({ messages: [{ role: 'user', content: 'A python script to generate the first 20 prime numbers.' }] }),
    } as any;    

    // call the POST function with the mock request
    const response = await POST(convertToRequest(mockReq));

    // expect the response of the POST function to be http status 200 (ok)
    // status 400 means there's a missing argument
    // status 500 means bad authorization, which usually pertains to the api key being invalid
    expect(response.status).toBe(200);

  }, 60000); // it actually spends time to generate so give it 12000ms timeframe
});