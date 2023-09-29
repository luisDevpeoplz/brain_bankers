import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManySubscriptionDataQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.SubscriptionDataWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.SubscriptionDataOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.SubscriptionDataWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.SubscriptionDataScalarFieldEnum], required: false }),
}))

export const findManySubscriptionDataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['SubscriptionData'],
    nullable: false,
    args: findManySubscriptionDataQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.subscriptionData.findMany({
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

export const findManySubscriptionDataQuery = defineQuery((t) => ({
  findManySubscriptionData: t.prismaField(findManySubscriptionDataQueryObject(t)),
}));
