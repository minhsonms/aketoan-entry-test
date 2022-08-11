/* eslint-disable no-undef */
import supertest from 'supertest';
import sum from '../test/sum';
// jest basic test
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// supertest test api:  resgister
test('gets the test endpoint', async () => {
  await supertest('http://localhost:3000')
    .post('/api/auth/register')
    .send({
      username: `minhsonfefe${new Date().getTime()}`,
      password: 'minhson',
    })
    .expect(200);
});
// supertest test api:  login
test('gets the test endpoint', async () => {
  await supertest('http://localhost:3000')
    .post('/api/auth/register')
    .send({
      username: `minhson123`,
      password: 'minhson',
    })
    .expect(200);
});
