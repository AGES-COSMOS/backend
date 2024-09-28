import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { UserRole } from '../src/enum/userRole';
import { ProjectStatus } from '../src/enum/projectStatus';

const prisma = new PrismaClient();

async function main() {
  // Seed size for each model
  const seedSize = {
    institutions: 5,
    users: 30,
    keywords: 30,
    projects: 30,
    events: 30,
  };

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

  // Create general parameters
  await prisma.generalParameters.create({
    data: {
      content:
        'Aplicativo em formato de rede social que visa unir projetos de extensão desenvolvidos por cursos de direito.\nFoco: Acesso à Justiça.\nObjetivo: Criar uma rede de projetos.',
      parameter: [
        {
          name: 'Telefone',
          value: '(51) 99999-9999',
        },
        {
          name: 'Email',
          value: 'exemplo@gmail.com',
        },
        {
          name: 'Instagram',
          value: 'https://www.instagram.com/cosmojurista/',
        },
        {
          name: 'YouTube',
          value: 'https://www.youtube.com/',
        },
        {
          name: 'LinkedIn',
          value: 'https://www.linkedin.com/feed/',
        },
      ],
      updatedBy: faker.person.firstName(),
    },
  });

  const roles = [],
    institutions = [],
    users = [],
    keywords = [],
    events = [],
    projects = [];
  // Create roles
  for (const key of Object.keys(UserRole)) {
    const role = await prisma.role.create({
      data: {
        title: key,
        updatedBy: faker.person.firstName(),
      },
    });
    roles.push(role);
  }

  // Create institutions
  for (let i = 0; i < seedSize.institutions; i++) {
    institutions.push(
      await prisma.institution.create({
        data: {
          name: faker.company.name(),
          cnpj: faker.string.numeric(14),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          updatedBy: faker.person.firstName(),
        },
      }),
    );
  }

  // Create users
  for (let i = 0; i < seedSize.users; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.firstName(),
        email: faker.internet.email().substring(0, 50),
        password: faker.internet.password({ length: 255 }),
        phone: `+55 ${faker.string.numeric(2)} ${faker.string.numeric(5)}-${faker.string.numeric(4)}`,
        cpfcnpj: faker.string.numeric(14),
        institution_id: faker.helpers.arrayElement(institutions).id,
        role_id: faker.helpers.arrayElement(roles).id,
        blocked: false,
      },
    });

    await prisma.address.create({
      data: {
        street: faker.location.street().substring(0, 99),
        number: faker.location.buildingNumber().substring(0, 49),
        complement: faker.location.secondaryAddress().substring(0, 99),
        neighborhood: faker.location.city().substring(0, 49),
        city: faker.location.city().substring(0, 29),
        state: faker.location.state().substring(0, 29),
        contry: faker.location.country().substring(0, 29),
        postalCode: faker.string.numeric(8),
        user_id: user.id,
      },
    });
    for (
      let j = 0;
      j <
      faker.helpers.rangeToNumber({
        min: 1,
        max: 3,
      });
      j++
    ) {
      const socialNetwork = await prisma.socialNetwork.create({
        data: {
          name: faker.company.name(),
          icon: `https://ui-avatars.com/api/?name=${user.name}&background=random`,
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
    }

    users.push(user);
  }

  for (
    let i = 0;
    i <
    faker.helpers.rangeToNumber({
      min: 0,
      max: Math.round(users.length * 1.5),
    });
    i++
  ) {
    const post = await prisma.post.create({
      data: {
        content: faker.lorem.paragraph(),
        user_id: users[i].id,
        updatedBy: faker.person.firstName(),
      },
    });
    for (
      let j = 0;
      j <
      faker.helpers.rangeToNumber({
        min: 0,
        max: Math.round(users.length / 2),
      });
      j++
    ) {
      await prisma.postLikes.create({
        data: {
          post_id: post.id,
          user_id: users[i].id,
          updatedBy: faker.person.firstName(),
        },
      });

      await prisma.postComments.create({
        data: {
          content: faker.lorem.sentence(),
          post_id: post.id,
          user_id: users[i].id,
          updatedBy: faker.person.firstName(),
        },
      });
    }
  }

  // Create keywords
  for (let i = 0; i < seedSize.keywords; i++) {
    keywords.push(
      await prisma.keyword.create({
        data: {
          word: faker.lorem.word(),
          updatedBy: faker.person.firstName(),
        },
      }),
    );
  }

  // Create projects
  for (let i = 0; i < seedSize.projects; i++) {
    const project = await prisma.project.create({
      data: {
        name: faker.company.name(),
        imageURL: faker.image.urlLoremFlickr({ width: 1500, height: 1000 }),
        history: faker.lorem.paragraph(),
        purpose: faker.lorem.sentence(),
        contact: `+55 ${faker.string.numeric(2)} ${faker.string.numeric(5)}-${faker.string.numeric(4)}`,
        start_date: faker.date.past(),
        status: faker.helpers.enumValue(ProjectStatus),
        teacher_id: faker.helpers.arrayElement(users).id,
        institution_id: faker.helpers.arrayElement(institutions).id,
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

    await prisma.projectCategory.create({
      data: {
        project_id: project.id,
        category_id: category.id,
        updatedBy: faker.person.firstName(),
      },
    });

    const randomProjectKeywords = faker.helpers.arrayElements(keywords, {
      min: 1,
      max: 8,
    });

    for (let j = 0; j < randomProjectKeywords.length; j++) {
      await prisma.projectKeyword.create({
        data: {
          project_id: project.id,
          keyword_id: randomProjectKeywords[j].id,
          updatedBy: faker.person.firstName(),
        },
      });
    }
    projects.push(project);
  }

  // Create events
  for (let i = 0; i < seedSize.events; i++) {
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
        institution_id: faker.helpers.arrayElement(institutions).id,
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

    await prisma.eventCategory.create({
      data: {
        event_id: event.id,
        category_id: category.id,
      },
    });

    events.push(event);
  }

  console.log('Seeding completed with mock data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
