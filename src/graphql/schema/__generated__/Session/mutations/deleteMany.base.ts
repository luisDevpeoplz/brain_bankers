import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManySessionMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.SessionWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.session.deleteMany({ where: args.where }),
  }),
);

export const deleteManySessionMutation = defineMutation((t) => ({
  deleteManySession: t.field(deleteManySessionMutationObject(t)),
}));