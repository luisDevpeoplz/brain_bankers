import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countHiringRoleQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.HiringRoleOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.HiringRoleWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.HiringRoleScalarFieldEnum], required: false }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.hiringRole.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countHiringRoleQuery = defineQuery((t) => ({
  countHiringRole: t.field(countHiringRoleQueryObject(t)),
}));