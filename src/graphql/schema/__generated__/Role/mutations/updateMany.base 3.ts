import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyRoleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.RoleWhereInput, required: false }),
      data: t.arg({ type: Inputs.RoleUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.role.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyRoleMutation = defineMutation((t) => ({
  updateManyRole: t.field(updateManyRoleMutationObject(t)),
}))
