import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Seeding General Parameters
  await prisma.generalParameters.create({
    data: {
      content: faker.lorem.sentence(),
      instagramURL: faker.internet.url(),
      youtubeURL: faker.internet.url(),
      linkedinURL: faker.internet.url(),
      updatedBy: faker.name.firstName(),
    },
  });

  // Seeding Institution
  const institution = await prisma.institution.create({
    data: {
      name: faker.company.name(),
      cnpj: faker.string.numeric(14),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding Roles
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
      email: faker.internet.email().substring(0,50),
      password: faker.internet.password({length:20}),
      phone: `+55 ${faker.string.numeric(2)} ${faker.string.numeric(5)}-${faker.string.numeric(4)}`, 
      cpfcnpj: faker.string.numeric(14),
      institution_id: institution.id,
      role_id: role.id,
      blocked: false,
    },
  });

  // Seeding Address
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

  // Seeding Event
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

  // Seeding Project
  const project = await prisma.project.create({
    data: {
      name: faker.company.name(),
      history: faker.lorem.paragraph(),
      purpose: faker.lorem.sentence(),
      contact: `+55 ${faker.string.numeric(2)} ${faker.string.numeric(5)}-${faker.string.numeric(4)}`, // Manually format as Brazilian number
      start_date: faker.date.past(),
      status: 'ongoing',
      teacher_id: user.id,
      institution_id: institution.id,
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding Categories
  const category = await prisma.category.create({
    data: {
      name: faker.commerce.department(),
      type: 1,  // Assuming 1 for project-related category
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding Keywords
  const keyword = await prisma.keyword.create({
    data: {
      word: faker.lorem.word(),
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding EventCategory (Many-to-Many relation)
  await prisma.eventCategory.create({
    data: {
      event_id: event.id,
      category_id: category.id,
    },
  });

  // Seeding ProjectCategory (Many-to-Many relation)
  await prisma.projectCategory.create({
    data: {
      project_id: project.id,
      category_id: category.id,
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding EventKeyword (Many-to-Many relation)
  await prisma.eventKeyword.create({
    data: {
      event_id: event.id,
      keyword_id: keyword.id,
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding ProjectKeyword (Many-to-Many relation)
  await prisma.projectKeyword.create({
    data: {
      project_id: project.id,
      keyword_id: keyword.id,
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding SocialNetwork
  const socialNetwork = await prisma.socialNetwork.create({
    data: {
      name: faker.company.name(),
      icon: `https://ui-avatars.com/api/?name=${faker.person.firstName()}&background=random`,
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding UsersSocialNetwork (Many-to-Many relation)
  await prisma.usersSocialNetwork.create({
    data: {
      user_id: user.id,
      social_network_id: socialNetwork.id,
      social_network_URL: faker.internet.url(),
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding Posts
  const post = await prisma.post.create({
    data: {
      content: faker.lorem.paragraph(),
      user_id: user.id,
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding PostLikes
  await prisma.postLikes.create({
    data: {
      post_id: post.id,
      user_id: user.id,
      updatedBy: faker.person.firstName(),
    },
  });

  // Seeding PostComments
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
