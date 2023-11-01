import axios from 'axios'

interface URLSearchParamsInit {
  [key: string]:
    | string
    | number
    | boolean
    | readonly (string | number | boolean)[]
    | null
    | undefined;
}

export interface RequestOptions {
  headers?: HeadersInit;
  params?: URLSearchParamsInit;
  body?: BodyInit;
  mode?: RequestMode;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrer?: string;
}

export default class AxiosClient {
  private baseUrl: string;
  private authToken: string | null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.authToken = null;
  }

  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const headers = this.getHeaders(options.headers);
    const response = await axios.get(this.baseUrl + url, {
      method: "GET",
      headers,
    });
    if (!response.ok) {
      throw new Error(
        `Failed to GET ${url}: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  }

  async post<T>(
    url: string,
    data: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const headers = this.getHeaders(options.headers);
    const response = await axios.post(this.baseUrl + url, {
      method: "POST",
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to POST ${url}: ${response.status} ${response.statusText}`
      );
    }

    // if response.json can't parse the response, it will throw an error
    // so we need to catch it and return the response
    try {
      const json = await response.json();
      return json;
    } catch (e) {
      return response as T;
    }
  }

  async put<T>(
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const headers = this.getHeaders(options.headers);
    const response = await axios.put(this.baseUrl + url, {
      method: "PUT",
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to PUT ${url}: ${response.status} ${response.statusText}`
      );
    }

    // if response.json can't parse the response, it will throw an error
    // so we need to catch it and return the response
    try {
      const json = await response.json();
      return json;
    } catch (e) {
      return response as T;
    }
  }

  async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const headers = this.getHeaders(options.headers);
    const response = await axios.delete(this.baseUrl + url, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to DELETE ${url}: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  setToken(token: string): void {
    this.authToken = token;
  }

  getToken(): string {
    return this.authToken || "";
  }

  private getHeaders(customHeaders?: HeadersInit): Headers {
    const headers = new Headers(customHeaders || {});
    if (!headers.has("content-type")) {
      headers.append("content-type", "application/json");
    }

    if (this.authToken) {
      headers.append("Authorization", `Bearer ${this.authToken}`);
    }

    return headers;
  }
}
