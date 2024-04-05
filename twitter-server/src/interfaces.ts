export interface JWTUser {
  id: string
  email: string
}

export interface GraphqlContext {
  user?: JWTUser // user can be of type JWTUser or undefined
}
