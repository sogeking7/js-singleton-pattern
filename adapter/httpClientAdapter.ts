import AxiosClient from "./AxiosClient";
import { RequestOptions } from "./AxiosClient";

interface IHttpAdapter {
  get<T>(url: string, options?: RequestOptions): Promise<T>;
  delete<T>(url: string, options?: RequestOptions): Promise<T>;
  setToken(token: string): void;
  getToken(): string;
}

class HttpClientAdapter implements IHttpAdapter {
  private httpClient: AxiosClient;

  constructor(baseUrl: string) {
    this.httpClient = new AxiosClient(baseUrl);
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.httpClient.get<T>(url, options);
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.httpClient.delete<T>(url, options);
  }

  setToken(token: string): void {
    this.httpClient.setToken(token);
  }

  getToken(): string {
    return this.httpClient.getToken();
  }
}
