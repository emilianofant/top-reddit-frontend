/**
 * This class contains all the definitions and capabilities to manage
 * HTTP requests.
 */
class Api {
  /**
   * Server/API base URL.
   */
  _serverBaseUrl: string;

  constructor() {
    // @todo: move to .env and .env.development
    this._serverBaseUrl = 'http://localhost:8080/api/v1';
  }
  /**
   * Function to wrap all HTTP GET request and return the body parsed
   * with the type required by context.
   *
   * @param  {string}                     path  URL to request.
   * @param  {RequestInit={method:'get'}} args  Optional arguments.
   * @returns Promise
   */
  async get<T>(path: string, args: RequestInit = { method: 'get' }): Promise<HttpResponse<T>> {
    const url = `${this._serverBaseUrl}${path}`;
    return await this._http<T>(new Request(url, args));
  }

  async post<T>(
    path: string,
    body: any,
    args: RequestInit = {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    },
  ): Promise<HttpResponse<T>> {
    const url = `${this._serverBaseUrl}${path}`;
    return await this._http<T>(new Request(url, args));
  }

  async put<T>(
    path: string,
    body: any,
    args: RequestInit = {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    },
  ): Promise<HttpResponse<T>> {
    const url = `${this._serverBaseUrl}${path}`;
    return await this._http<T>(new Request(url, args));
  }

  async delete<T>(
    path: string,
    args: RequestInit = { method: 'delete' },
  ): Promise<HttpResponse<T>> {
    const url = `${this._serverBaseUrl}${path}`;
    return await this._http<T>(new Request(url, args));
  }
  /**
   * Function that wraps the fetch action.
   *
   * @param  {RequestInfo} request  Request URL and params/body.
   * @returns Promise
   */
  async _http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(request);

    response.parsedBody = await response.json();

    return response;
  }
}

export default Api;
