import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Delete from many-to-many relationships first
  await prisma.postLikes.deleteMany({});
  await prisma.postComments.deleteMany({});
  await prisma.usersSocialNetwork.deleteMany({});
  await prisma.projectKeyword.deleteMany({});
  await prisma.projectCategory.deleteMany({});
  await prisma.eventCategory.deleteMany({});

  // Delete from child tables
  await prisma.address.deleteMany({});
  await prisma.keyword.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.socialNetwork.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.event.deleteMany({});

  // Delete from user-related tables
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.institution.deleteMany({});
  await prisma.generalParameters.deleteMany({});

  await prisma.generalParameters.createMany({
    data: [
      {
        content:
          'Aplicativo em formato de rede social que visa unir projetos de extensão desenvolvidos por cursos de direito.\nFoco: Acesso à Justiça.\nObjetivo: Criar uma rede de projetos.',
        parameter: 'SobreNos',
        updatedBy: faker.name.firstName(),
      },
      {
        content: '(51) 99999-9999',
        parameter: 'Telefone',
        updatedBy: faker.name.firstName(),
      },
      {
        content: 'exemplo@gmail.com',
        parameter: 'E-mail',
        updatedBy: faker.name.firstName(),
      },
      {
        content: 'https://www.instagram.com/rede.cosmos/',
        parameter: 'Instagram',
        updatedBy: faker.name.firstName(),
      },
      {
        content: 'https://www.youtube.com/@cosmojurista',
        parameter: 'YouTube',
        updatedBy: faker.name.firstName(),
      },
      {
        content: 'https://www.linkedin.com/company/rede-cosmos/',
        parameter: 'LinkedIn',
        updatedBy: faker.name.firstName(),
      },
    ],
  });

  const institution = await prisma.institution.create({
    data: {
      name: faker.company.name(),
      cnpj: faker.string.numeric(14),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      updatedBy: faker.person.firstName(),
    },
  });

  const role = await prisma.role.create({
    data: {
      title: 'Admin',
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding User
  const user = await prisma.user.create({
    data: {
      name: faker.person.firstName(),
      email: faker.internet.email().substring(0, 50),
      password: faker.internet.password({ length: 255 }),
      phone: `+55 ${faker.string.numeric(2)} ${faker.string.numeric(5)}-${faker.string.numeric(4)}`,
      cpfcnpj: faker.string.numeric(14),
      institution_id: institution.id,
      role_id: role.id,
      blocked: false,
    },
  });

  await prisma.address.create({
    data: {
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      complement: faker.location.secondaryAddress(),
      neighborhood: faker.location.city(),
      city: faker.location.city(),
      state: faker.location.state(),
      contry: faker.location.country(),
      postalCode: faker.string.numeric(8),
      user_id: user.id,
    },
  });

  const event = await prisma.event.create({
    data: {
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      date: faker.date.future(),
      hour: faker.date.recent(),
      IsOnline: faker.datatype.boolean(),
      address: faker.location.streetAddress(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      institution_id: institution.id,
      updatedBy: faker.person.firstName(),
    },
  });

  const project = await prisma.project.create({
    data: {
      name: faker.company.name(),
      imageURL: faker.string.uuid() + '.webp',
      history: faker.lorem.paragraph(),
      purpose: faker.lorem.sentence(),
      contact: `+55 ${faker.string.numeric(2)} ${faker.string.numeric(5)}-${faker.string.numeric(4)}`,
      start_date: faker.date.past(),
      status: 'ongoing',
      teacher_id: user.id,
      institution_id: institution.id,
      updatedBy: faker.person.firstName(),
    },
  });

  const category = await prisma.category.create({
    data: {
      name: faker.commerce.department(),
      type: 1,
      updatedBy: faker.person.firstName(),
    },
  });

  const keyword = await prisma.keyword.create({
    data: {
      word: faker.lorem.word(),
      updatedBy: faker.person.firstName(),
    },
  });

  await prisma.eventCategory.create({
    data: {
      event_id: event.id,
      category_id: category.id,
    },
  });

  await prisma.projectCategory.create({
    data: {
      project_id: project.id,
      category_id: category.id,
      updatedBy: faker.person.firstName(),
    },
  });

  await prisma.projectKeyword.create({
    data: {
      project_id: project.id,
      keyword_id: keyword.id,
      updatedBy: faker.person.firstName(),
    },
  });

  const socialNetwork = await prisma.socialNetwork.create({
    data: {
      name: faker.company.name(),
      icon: `https://ui-avatars.com/api/?name=${faker.person.firstName()}&background=random`,
      updatedBy: faker.person.firstName(),
    },
  });

  await prisma.usersSocialNetwork.create({
    data: {
      user_id: user.id,
      social_network_id: socialNetwork.id,
      social_network_URL: faker.internet.url(),
      updatedBy: faker.person.firstName(),
    },
  });

  const post = await prisma.post.create({
    data: {
      content: faker.lorem.paragraph(),
      user_id: user.id,
      updatedBy: faker.person.firstName(),
    },
  });

  await prisma.postLikes.create({
    data: {
      post_id: post.id,
      user_id: user.id,
      updatedBy: faker.person.firstName(),
    },
  });

  await prisma.postComments.create({
    data: {
      content: faker.lorem.sentence(),
      post_id: post.id,
      user_id: user.id,
      updatedBy: faker.person.firstName(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
