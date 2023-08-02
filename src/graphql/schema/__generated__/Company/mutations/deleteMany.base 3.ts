import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.CompanyWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.company.deleteMany({ where: args.where }),
  })
)

export const deleteManyCompanyMutation = defineMutation((t) => ({
  deleteManyCompany: t.field(deleteManyCompanyMutationObject(t)),
}))
