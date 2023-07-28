import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstDisqualifyReasonQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'DisqualifyReason',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.DisqualifyReasonWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.DisqualifyReasonOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.DisqualifyReasonWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.DisqualifyReasonScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.disqualifyReason.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstDisqualifyReasonQuery = defineQuery((t) => ({
  findFirstDisqualifyReason: t.prismaField(findFirstDisqualifyReasonQueryObject(t)),
}));