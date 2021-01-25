import Api from './api';

/**
 * Service class is the main class that contains the definitions
 * and other stuff required for the app to run.
 */
class PostService {
  test: ITest;
  api: Api;

  constructor() {
    this.api = new Api();
    this.test = { message: 'Hello app' };
  }

  healthCheck(): ITest {
    return this.test;
  }

  async getRedditTopPosts(): Promise<IPost[]> {
    const res = await this.api
      .get<IPost[]>('posts')
      .then((posts) => posts.parsedBody || [])
      .catch((err) => {
        throw new Error(err);
      });

    return res;
  }
}

export default PostService;
