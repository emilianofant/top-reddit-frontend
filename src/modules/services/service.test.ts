import Service from './service';

describe('Core class tests', () => {
  const _service = new Service();

  test('Health check is fine', () => {
    expect(_service.healthCheck().message).toEqual('Hello app');
  });
});
