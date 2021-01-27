interface ITest {
  message: string;
}

interface IPost {
  id?: string;
  title: string;
  author: string;
  entryDate: string;
  postUrl: string;
  thumbnail: string;
  numberOfComments: number;
  status: boolean;
  isFavorited?: boolean;
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface IFetchError {
  message: string;
}
