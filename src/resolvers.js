export const resolvers = {
  Query: {
    doctors: async (_, __, { prisma }) => {
      return prisma.doctor.findMany();
    },
    doctor: async (_, { id }, { prisma }) => {
      return prisma.doctor.findUnique({
        where: { id },
      });
    },
    visitors: async (_, __, { prisma }) => {
      return prisma.visitor.findMany();
    },
    visitor: async (_, { id }, { prisma }) => {
      return prisma.visitor.findUnique({
        where: { id },
      });
    },
    visits: async (_, __, { prisma }) => {
      return prisma.visit.findMany({
        include: {
          doctor: true,
          visitor: true,
        },
      });
    },
    visit: async (_, { id }, { prisma }) => {
      return prisma.visit.findUnique({
        where: { id },
        include: {
          doctor: true,
          visitor: true,
        },
      });
    },
    histories: async (_, __, { prisma }) => {
      return prisma.history.findMany({
        include: {
          visitor: true,
        },
      });
    },
    history: async (_, { id }, { prisma }) => {
      return prisma.history.findUnique({
        where: { id },
        include: {
          visitor: true,
        },
      });
    },
  },

  Mutation: {
    createDoctor: async (_, { input }, { prisma }) => {
      return prisma.doctor.create({
        data: input,
      });
    },
    updateDoctor: async (_, { id, input }, { prisma }) => {
      return prisma.doctor.update({
        where: { id },
        data: input,
      });
    },
    deleteDoctor: async (_, { id }, { prisma }) => {
      return prisma.doctor.delete({
        where: { id },
      });
    },

    createVisitor: async (_, { input }, { prisma }) => {
      return prisma.visitor.create({
        data: input,
      });
    },
    updateVisitor: async (_, { id, input }, { prisma }) => {
      return prisma.visitor.update({
        where: { id },
        data: input,
      });
    },
    deleteVisitor: async (_, { id }, { prisma }) => {
      return prisma.visitor.delete({
        where: { id },
      });
    },

    createVisit: async (_, { input }, { prisma }) => {
      return prisma.visit.create({
        data: {
          ...input,
          date: new Date(input.date),
        },
        include: {
          doctor: true,
          visitor: true,
        },
      });
    },
    updateVisit: async (_, { id, input }, { prisma }) => {
      return prisma.visit.update({
        where: { id },
        data: {
          ...input,
          date: input.date ? new Date(input.date) : undefined,
        },
        include: {
          doctor: true,
          visitor: true,
        },
      });
    },
    deleteVisit: async (_, { id }, { prisma }) => {
      return prisma.visit.delete({
        where: { id },
      });
    },

    createHistory: async (_, { input }, { prisma }) => {
      return prisma.history.create({
        data: input,
        include: {
          visitor: true,
        },
      });
    },
    updateHistory: async (_, { id, input }, { prisma }) => {
      return prisma.history.update({
        where: { id },
        data: input,
        include: {
          visitor: true,
        },
      });
    },
    deleteHistory: async (_, { id }, { prisma }) => {
      return prisma.history.delete({
        where: { id },
      });
    },
  },

  Doctor: {
    visits: async (parent, _, { prisma }) => {
      return prisma.visit.findMany({
        where: { doctorId: parent.id },
      });
    },
  },

  Visitor: {
    visits: async (parent, _, { prisma }) => {
      return prisma.visit.findMany({
        where: { visitorId: parent.id },
      });
    },
    history: async (parent, _, { prisma }) => {
      return prisma.history.findMany({
        where: { visitorId: parent.id },
      });
    },
  },
};