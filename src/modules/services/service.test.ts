import PostService from './service';

describe('Core class tests', () => {
  const _postService = new PostService();

  test('Health check is fine', () => {
    expect(_postService.healthCheck().message).toEqual('Hello app');
  });

  test('Function to get the list of Top posts from Reddit', async () => {
    const res = await _postService.getRedditTopPosts();
    expect(res[0]).toEqual({
      ID: expect.any(String),
      Title: expect.any(String),
      Author: expect.any(String),
      EntryDate: expect.any(String),
      Thumbnail: expect.any(String),
      NumberOfComments: expect.any(Number),
      Status: expect.any(Boolean),
    });
  });

  test('Function to get the list of Fav posts from the API', async () => {
    const res = await _postService.getFavTopPosts();
    expect(res[0]).toEqual({
      ID: expect.any(String),
      Title: expect.any(String),
      Author: expect.any(String),
      EntryDate: expect.any(String),
      Thumbnail: expect.any(String),
      NumberOfComments: expect.any(Number),
      Status: expect.any(Boolean),
    });
  });
});
