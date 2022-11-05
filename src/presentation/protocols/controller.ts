import { HttpRequest, httpResponse } from './http'

export interface Controller {
  handle: (HttpRequest: HttpRequest) => Promise<httpResponse>
}
