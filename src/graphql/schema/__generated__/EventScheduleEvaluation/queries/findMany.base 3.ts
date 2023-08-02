import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyEventScheduleEvaluationQueryObject = defineQueryFunction(
  (t) =>
    defineQueryPrismaObject({
      type: ['EventScheduleEvaluation'],
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleEvaluationWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventScheduleEvaluationOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventScheduleEvaluationWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventScheduleEvaluationScalarFieldEnum],
          required: false,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleEvaluation.findMany({
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

export const findManyEventScheduleEvaluationQuery = defineQuery((t) => ({
  findManyEventScheduleEvaluation: t.prismaField(
    findManyEventScheduleEvaluationQueryObject(t)
  ),
}))
