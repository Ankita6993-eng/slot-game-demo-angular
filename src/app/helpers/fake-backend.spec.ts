import { FakeBackend } from './fake-backend';

describe('FakeBackend', () => {
  it('should create an instance', () => {
    expect(new FakeBackend()).toBeTruthy();
  });
});
