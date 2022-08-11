/* eslint-disable no-undef */
import User from '../models/user';
import { dbConnect, dbDisconnect } from '../utils/test-utils/dbHandler.utils';

beforeAll(async () => {
  await dbConnect();
});
afterAll(async () => {
  await dbDisconnect();
});

describe('User Model Test Suite', () => {
  test('should validate saving a new user successfully', async () => {
    const validUser = {
      username: 'minhson321',
      password: 'minhson',
    };
    const savedUser = await User(validUser);
    await savedUser.save();
    // eslint-disable-next-line no-underscore-dangle
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(validUser.username);
    expect(savedUser.password).toBe(validUser.password);
  });
});
