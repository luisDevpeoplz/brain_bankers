import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyUserMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.UserWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.user.deleteMany({ where: args.where }),
  }),
);

export const deleteManyUserMutation = defineMutation((t) => ({
  deleteManyUser: t.field(deleteManyUserMutationObject(t)),
}));