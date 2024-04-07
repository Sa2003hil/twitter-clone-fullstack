import { PrismaClientRustPanicError } from '@prisma/client/runtime/library'
import { prismaClient } from '../../clients/db'
import { GraphqlContext } from '../../interfaces'
import { Tweet } from '@prisma/client'

interface CreateTweetPayload {
  content: string
  imageURL?: string
}

const queries = {
  getAllTweets: () => prismaClient.tweet.findMany({ orderBy: {} })
}

const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    ctx: GraphqlContext
  ) => {
    // if the user is not loggedIn then he/she can't create a tweet
    if (!ctx.user) throw new Error('You are not Authenticated')

    const tweet = await prismaClient.tweet.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: { connect: { id: ctx.user.id } } // foreign relations
      }
    })
    return tweet
  }
}

// creating extra Resolver for author details in the tweets
const extraResolvers = {
  // for a tweet if you are asking for the user
  Tweet: {
    author: (parent: Tweet) =>
      prismaClient.user.findUnique({ where: { id: parent.authorId } })
  }
}

export const resolvers = { mutations, extraResolvers, queries }
