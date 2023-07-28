import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyTalentPoolFileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TalentPoolFileWhereInput, required: false }),
      data: t.arg({ type: Inputs.TalentPoolFileUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPoolFile.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyTalentPoolFileMutation = defineMutation((t) => ({
  updateManyTalentPoolFile: t.field(updateManyTalentPoolFileMutationObject(t)),
}));
