import PostService from './post.service';

describe('Core class tests', () => {
  const _postService = new PostService();
  let postId: string;

  test('Health check is fine', () => {
    expect(_postService.healthCheck().message).toEqual('Hello app');
  });

  test('Function to get the list of Top posts from Reddit', async () => {
    const res = await _postService.getRedditTopPosts();
    expect(res[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      author: expect.any(String),
      entryDate: expect.any(String),
      postUrl: expect.any(String),
      thumbnail: expect.any(String),
      numberOfComments: expect.any(Number),
      status: expect.any(Boolean),
    });
  });

  test('Function to get the list of Fav posts from the API', async () => {
    const res = await _postService.getFavTopPosts();
    expect(res[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      author: expect.any(String),
      entryDate: expect.any(String),
      postUrl: expect.any(String),
      thumbnail: expect.any(String),
      isFavorited: expect.any(Boolean),
      numberOfComments: expect.any(Number),
      status: expect.any(Boolean),
    });
  });

  test('Function to Get a Post by id', async () => {
    const id = '1234-1234-abcd-2';
    const post = await _postService.getPostById(id);
    expect(post?.id).toEqual(id);
  });

  test('Function to Add a Post as favorite', async () => {
    const favPostMock = {
      title: 'Mocked Post title',
      author: 'Mockedauthor22',
      entryDate: '5 hours ago',
      postUrl:
        'https://reddit.com/r/gaming/comments/l4u5up/im_a_solo_game_developer_working_on_a_dark_scifi/',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm0e8aRJPZj0gi70afB0aIty6qIhv92ejZTg&usqp=CAU',
      numberOfComments: 4,
      status: true,
    };
    const resPost = await _postService.setFavorite(favPostMock);
    if (typeof resPost === 'object') {
      postId = resPost?.id || '';
      const post = await _postService.getPostById(postId);

      expect(post?.id).toEqual(resPost?.id);
    }
  });

  test('Function to Delete a Post', async () => {
    const resDelete = await _postService.deleteFavorite(postId);
    const post = await _postService.getPostById(postId);

    expect(post).toEqual({});
  });
});
