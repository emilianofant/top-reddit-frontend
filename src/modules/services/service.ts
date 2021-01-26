/**
 * Service class is the main class that contains the definitions
 * and other stuff required for the app to run.
 */
class Service {
  test: ITest;

  constructor() {
    this.test = { message: 'Hello app' };
  }

  healthCheck(): ITest {
    return this.test;
  }
}

export default Service;
