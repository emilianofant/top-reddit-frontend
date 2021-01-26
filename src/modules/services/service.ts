import Api from './api';

/**
 * Service class is the main class that contains the definitions
 * and other stuff required for the app to manage the Posts entities.
 */
class PostService {
  test: ITest;
  api: Api;

  constructor() {
    this.api = new Api();
    this.test = { message: 'Hello app' };
  }
  /**
   * Test function
   *
   * @returns ITest
   */
  healthCheck(): ITest {
    return this.test;
  }
  /**
   * Function to retrieve the list of Top Posts from Reddit.
   *
   * @returns Promise
   */
  async getRedditTopPosts(): Promise<IPost[]> {
    const res = await this.api
      .get<IPost[]>('/reddit')
      .then((posts) => posts.parsedBody || [])
      .catch((err) => {
        throw new Error(err);
      });

    return res;
  }
  /**
   * Function to retrieve the list of Faved Posts from our API.
   *
   * @returns Promise
   */
  async getFavTopPosts(): Promise<IPost[]> {
    const res = await this.api
      .get<IPost[]>('/posts')
      .then((posts) => posts.parsedBody || [])
      .catch((err) => {
        throw new Error(err);
      });

    return res;
  }
}

export default PostService;
