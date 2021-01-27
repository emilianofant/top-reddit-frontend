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
      .get<IPost[]>('/post')
      .then((posts) => posts.parsedBody?.map((p) => ({ ...p, IsFavorited: true })) || [])
      .catch((err) => {
        throw new Error(err);
      });

    return res;
  }

  async getPostById(id: string): Promise<IPost | undefined> {
    const res = await this.api.get<IPost>(`/post/${id}`).then((res) => res.parsedBody);

    return res;
  }

  async setFavorite(post: IPost): Promise<IPost | undefined> {
    const res = await this.api.post<IPost>('/post', post).then((r) => r.parsedBody);
    return res;
  }

  async deleteFavorite(id: string): Promise<any> {
    const res = await this.api.delete<IPost>(`/post/${id}`).then((r) => r.parsedBody);
    return res;
  }
}

export default PostService;
