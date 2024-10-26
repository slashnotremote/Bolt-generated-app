export const typeDefs = `#graphql
  type Doctor {
    id: Int!
    name: String!
    specialty: String!
    email: String!
    phone: String
    visits: [Visit!]!
    createdAt: String!
    updatedAt: String!
  }

  type Visitor {
    id: Int!
    name: String!
    email: String!
    phone: String
    visits: [Visit!]!
    history: [History!]!
    createdAt: String!
    updatedAt: String!
  }

  type Visit {
    id: Int!
    doctor: Doctor!
    visitor: Visitor!
    date: String!
    reason: String!
    notes: String
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type History {
    id: Int!
    visitor: Visitor!
    condition: String!
    diagnosis: String
    treatment: String
    date: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    doctors: [Doctor!]!
    doctor(id: Int!): Doctor
    visitors: [Visitor!]!
    visitor(id: Int!): Visitor
    visits: [Visit!]!
    visit(id: Int!): Visit
    histories: [History!]!
    history(id: Int!): History
  }

  input DoctorInput {
    name: String!
    specialty: String!
    email: String!
    phone: String
  }

  input VisitorInput {
    name: String!
    email: String!
    phone: String
  }

  input VisitInput {
    doctorId: Int!
    visitorId: Int!
    date: String!
    reason: String!
    notes: String
    status: String
  }

  input HistoryInput {
    visitorId: Int!
    condition: String!
    diagnosis: String
    treatment: String
  }

  type Mutation {
    createDoctor(input: DoctorInput!): Doctor!
    updateDoctor(id: Int!, input: DoctorInput!): Doctor!
    deleteDoctor(id: Int!): Doctor

    createVisitor(input: VisitorInput!): Visitor!
    updateVisitor(id: Int!, input: VisitorInput!): Visitor!
    deleteVisitor(id: Int!): Visitor

    createVisit(input: VisitInput!): Visit!
    updateVisit(id: Int!, input: VisitInput!): Visit!
    deleteVisit(id: Int!): Visit

    createHistory(input: HistoryInput!): History!
    updateHistory(id: Int!, input: HistoryInput!): History!
    deleteHistory(id: Int!): History
  }
`;