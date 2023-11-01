import AxiosClient from "./AxiosClient";
import { RequestOptions } from "./AxiosClient";

interface IHttpAdapter {
  get<T>(url: string, options?: RequestOptions): Promise<T>;
  delete<T>(url: string, options?: RequestOptions): Promise<T>;
  setToken(token: string): void;
  getToken(): string;
}

class axiosClientAdapter implements IHttpAdapter {
  private axiosClient: AxiosClient;

  constructor(baseUrl: string) {
    this.axiosClient = new AxiosClient(baseUrl);
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.axiosClient.get<T>(url, options);
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.axiosClient.delete<T>(url, options);
  }

  setToken(token: string): void {
    this.axiosClient.setToken(token);
  }

  getToken(): string {
    return this.axiosClient.getToken();
  }
}
