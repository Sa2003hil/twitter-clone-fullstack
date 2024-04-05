import { graphql } from '../../gql'

export const verifyUsertGoogleTokenQuery = graphql(`
  #graphql
  query verifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`)

export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
    }
  }
`)
