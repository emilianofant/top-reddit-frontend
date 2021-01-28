interface ITest {
  message: string;
}

interface IPost {
  id: string;
  title: string;
  author: string;
  entryDate: string;
  permalink: string;
  thumbnail: string;
  num_comments: number;
  viewed: boolean;
  isFavorited?: boolean;
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface IPostsJsonResponse {
  posts: IPost[];
}

interface IFetchError {
  message: string;
}
