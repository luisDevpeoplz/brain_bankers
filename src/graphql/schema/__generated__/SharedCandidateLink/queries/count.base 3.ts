import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryObject,
} from '../../utils'

export const countSharedCandidateLinkQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({
        type: Inputs.SharedCandidateLinkWhereInput,
        required: false,
      }),
      orderBy: t.arg({
        type: [Inputs.SharedCandidateLinkOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.SharedCandidateLinkWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.SharedCandidateLinkScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.sharedCandidateLink.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  })
)

export const countSharedCandidateLinkQuery = defineQuery((t) => ({
  countSharedCandidateLink: t.field(countSharedCandidateLinkQueryObject(t)),
}))
