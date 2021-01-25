import PostService from './service';

describe('Core class tests', () => {
  const _postService = new PostService();

  test('Health check is fine', () => {
    expect(_postService.healthCheck().message).toEqual('Hello app');
  });

  test('Function to get the list of Top posts from Reddit', () => {
    return _postService.getRedditTopPosts().then((res) => {
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
});
