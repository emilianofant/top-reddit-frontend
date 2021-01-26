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
      ID: expect.any(String),
      Title: expect.any(String),
      Author: expect.any(String),
      EntryDate: expect.any(String),
      PostUrl: expect.any(String),
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
      PostUrl: expect.any(String),
      Thumbnail: expect.any(String),
      IsFavorited: expect.any(Boolean),
      NumberOfComments: expect.any(Number),
      Status: expect.any(Boolean),
    });
  });

  test('Function to Get a Post by ID', async () => {
    const id = '1234-1234-abcd-2';
    const post = await _postService.getPostById(id);
    expect(post.id).toEqual(id);
  });

  test('Function to Add a Post as favorite', async () => {
    const favPostMock = {
      Title: 'Mocked Post Title',
      Author: 'MockedAuthor22',
      EntryDate: '5 hours ago',
      PostUrl:
        'https://reddit.com/r/gaming/comments/l4u5up/im_a_solo_game_developer_working_on_a_dark_scifi/',
      Thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm0e8aRJPZj0gi70afB0aIty6qIhv92ejZTg&usqp=CAU',
      NumberOfComments: 4,
      Status: true,
    };
    const resPost = await _postService.setFavorite(favPostMock);
    postId = resPost.id;
    const post = await _postService.getPostById(postId);

    expect(post.id).toEqual(resPost.id);
  });

  test('Function to Delete a Post', async () => {
    const resDelete = await _postService.deleteFavorite(postId);
    const post = await _postService.getPostById('dONdk2FW');
    // TODO: Continue from here. This test is not valid
    console.log(post);


    expect(post).toEqual({});
  })
});
