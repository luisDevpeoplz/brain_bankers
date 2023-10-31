import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EventObject = definePrismaObject('Event', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EventIdFieldObject),
    date: t.field(EventDateFieldObject),
    time: t.field(EventTimeFieldObject),
    duration: t.field(EventDurationFieldObject),
    type: t.field(EventTypeFieldObject),
    location: t.field(EventLocationFieldObject),
    note: t.field(EventNoteFieldObject),
    privateNote: t.field(EventPrivateNoteFieldObject),
    company: t.relation('company', EventCompanyFieldObject),
    companyId: t.field(EventCompanyIdFieldObject),
    eventInterviewers: t.relation('eventInterviewers', EventEventInterviewersFieldObject(t)),
    evaluations: t.relation('evaluations', EventEvaluationsFieldObject(t)),
  }),
});

export const EventIdFieldObject = defineFieldObject('Event', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EventDateFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.date,
});

export const EventTimeFieldObject = defineFieldObject('Event', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.time,
});

export const EventDurationFieldObject = defineFieldObject('Event', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.duration,
});

export const EventTypeFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const EventLocationFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.location,
});

export const EventNoteFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.note,
});

export const EventPrivateNoteFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.privateNote,
});

export const EventCompanyFieldObject = defineRelationObject('Event', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventCompanyIdFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const EventEventInterviewersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventInterviewerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventInterviewerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventInterviewerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventInterviewerScalarFieldEnum], required: false }),
}))

export const EventEventInterviewersFieldObject = defineRelationFunction('Event', (t) =>
  defineRelationObject('Event', 'eventInterviewers', {
    description: undefined,
    nullable: false,
    args: EventEventInterviewersFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const EventEvaluationsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EvaluationScalarFieldEnum], required: false }),
}))

export const EventEvaluationsFieldObject = defineRelationFunction('Event', (t) =>
  defineRelationObject('Event', 'evaluations', {
    description: undefined,
    nullable: false,
    args: EventEvaluationsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);
