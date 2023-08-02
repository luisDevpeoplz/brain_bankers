import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.EvaluationWhereInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.evaluation.deleteMany({ where: args.where }),
  })
)

export const deleteManyEvaluationMutation = defineMutation((t) => ({
  deleteManyEvaluation: t.field(deleteManyEvaluationMutationObject(t)),
}))
