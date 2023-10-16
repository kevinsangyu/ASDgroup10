import { increaseApiLimit } from './api-limit'; // Adjust the import path as needed

// Mock the required dependencies
jest.mock('@clerk/nextjs', () => ({
  auth: () => ({ userId: 'testUserId' }),
}));

jest.mock('./prismadb', () => ({
  userApiLimit: {
    findUnique: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
}));

describe('increaseApiLimit', () => {
  it('should update the userApiLimit count if it exists', async () => {
    const mockUserApiLimit = { userId: 'testUserId', count: 5 };

    const findUniqueMock = jest
      .spyOn(require('./prismadb').userApiLimit, 'findUnique')
      .mockResolvedValue(mockUserApiLimit);

    const updateMock = jest
      .spyOn(require('./prismadb').userApiLimit, 'update')
      .mockResolvedValue(mockUserApiLimit);

    await increaseApiLimit();

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { userId: 'testUserId' },
    });
    expect(updateMock).toHaveBeenCalledWith({
      where: { userId: 'testUserId' },
      data: { count: 6 }, // Expect count to be incremented
    });
  });

  it('should create userApiLimit if it does not exist', async () => {
    const findUniqueMock = jest
      .spyOn(require('./prismadb').userApiLimit, 'findUnique')
      .mockResolvedValue(null);

    const createMock = jest
      .spyOn(require('./prismadb').userApiLimit, 'create')
      .mockResolvedValue({ userId: 'testUserId', count: 1 });

    await increaseApiLimit();

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { userId: 'testUserId' },
    });
    expect(createMock).toHaveBeenCalledWith({
      data: { userId: 'testUserId', count: 1 },
    });
  });

  it('should not do anything if userId is not available', async () => {
    const authMock = jest.spyOn(require('@clerk/nextjs'), 'auth').mockReturnValue({ userId: null });

    await increaseApiLimit();

    expect(authMock).toHaveBeenCalled();
  });
});
