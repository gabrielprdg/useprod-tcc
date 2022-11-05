export interface HttpRequest {
  body?: any
  params?: any
  headers?: any
  accountId?: string
}

export interface HttpResponse {
  statusCode: number
  body: any
}
