import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyEventQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Event'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EventWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.EventOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.EventWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.EventScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  })
)

export const findManyEventQuery = defineQuery((t) => ({
  findManyEvent: t.prismaField(findManyEventQueryObject(t)),
}))
