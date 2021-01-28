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
      .get<IPostsJsonResponse>('/reddit')
      .then((res) => res.parsedBody?.posts || [])
      .catch((err) => {
        console.log('Error: ', err);
        return [];
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
      .get<IPostsJsonResponse>('/posts')
      .then((res) => res.parsedBody?.posts.map((p) => ({ ...p, isFavorited: true })) || [])
      .catch((err) => {
        console.log('Error: ', err);
        return [];
      });

    return res;
  }
  /**
   * Function to Get a specific post by ID.
   *
   * @param  {string} id  The post id to find.
   * @returns Promise
   */
  async getPostById(id: string): Promise<IPost | undefined> {
    const res = await this.api.get<IPost>(`/post/${id}`).then((res) => res.parsedBody);

    return res;
  }
  /**
   * Function to save a post as Favorite.
   *
   * @param  {IPost} post
   * @returns Promise
   */
  async setFavorite(post: IPost): Promise<IPost | boolean> {
    const res = await this.api
      .post<IPost>('/post', post)
      .then((r) => r.parsedBody || false)
      .catch(() => {
        return false;
      });
    return res;
  }
  /**
   * Function to Remove a post from Favorite.
   *
   * @param  {string} id
   * @returns Promise
   */
  async deleteFavorite(id: string): Promise<any> {
    const res = await this.api.delete<IPost>(`/post?id=${id}`).then((r) => r.parsedBody);
    return res;
  }
  async markAsReaded(id: string): Promise<any> {
    const res = await this.api.put('/post/viewed', { id: id }).then((res) => console.log(res));
  }
}

export default PostService;
