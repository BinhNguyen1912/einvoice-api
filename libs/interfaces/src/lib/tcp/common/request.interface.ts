export class Request<T> {
  processId: string;
  data: T;
  constructor(partial: Partial<Request<T>>) {
    Object.assign(this, partial);
  }
}
export type RequestType<T> = Request<T>;
