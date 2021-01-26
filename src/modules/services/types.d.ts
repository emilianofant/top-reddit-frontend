interface ITest {
  message: string;
}

interface IPost {
  ID?: string;
  Title: string;
  Author: string;
  EntryDate: string;
  PostUrl: string;
  Thumbnail: string;
  NumberOfComments: number;
  Status: boolean;
  IsFavorited?: boolean;
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface IFetchError {
  message: string;
}
