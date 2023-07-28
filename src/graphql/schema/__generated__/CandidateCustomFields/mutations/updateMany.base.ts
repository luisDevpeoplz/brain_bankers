import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyCandidateCustomFieldsMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CandidateCustomFieldsWhereInput, required: false }),
      data: t.arg({ type: Inputs.CandidateCustomFieldsUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.candidateCustomFields.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyCandidateCustomFieldsMutation = defineMutation((t) => ({
  updateManyCandidateCustomFields: t.field(updateManyCandidateCustomFieldsMutationObject(t)),
}));