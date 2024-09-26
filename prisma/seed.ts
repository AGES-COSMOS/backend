import { PrismaClient } from '@prisma/client';

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

  // Create general parameters
  await prisma.generalParameters.createMany({
    data: [
      {
        content: 'Aplicativo em formato de rede social que visa unir projetos de extensão desenvolvidos por cursos de direito.\nFoco: Acesso à Justiça.\nObjetivo: Criar uma rede de projetos.',
        parameter: 'SobreNos',
        updatedBy: 'Admin',
      },
      {
        content: '(51) 99999-9999',
        parameter: 'Telefone',
        updatedBy: 'Admin',
      },
      {
        content: 'exemplo@gmail.com',
        parameter: 'E-mail',
        updatedBy: 'Admin',
      },
      {
        content: 'https://www.instagram.com/rede.cosmos/',
        parameter: 'Instagram',
        updatedBy: 'Admin',
      },
      {
        content: 'https://www.youtube.com/@cosmojurista',
        parameter: 'YouTube',
        updatedBy: 'Admin',
      },
      {
        content: 'https://www.linkedin.com/company/rede-cosmos/',
        parameter: 'LinkedIn',
        updatedBy: 'Admin',
      },
    ],
  });

  // Create 3 institutions with mocked data
  const institutions = await Promise.all([
    prisma.institution.create({
      data: {
        name: 'Institution 1',
        cnpj: '12345678000190',
        latitude: '-30.0277',
        longitude: '-51.2287',
        updatedBy: 'Admin',
      },
    }),
    prisma.institution.create({
      data: {
        name: 'Institution 2',
        cnpj: '98765432000112',
        latitude: '-30.0277',
        longitude: '-51.2287',
        updatedBy: 'Admin',
      },
    }),
    prisma.institution.create({
      data: {
        name: 'Institution 3',
        cnpj: '19283746000158',
        latitude: '-30.0277',
        longitude: '-51.2287',
        updatedBy: 'Admin',
      },
    }),
  ]);

  // Create 2 roles (Teacher and Student)
  const roles = await Promise.all([
    prisma.role.create({
      data: {
        title: 'Teacher',
        updatedBy: 'Admin',
      },
    }),
    prisma.role.create({
      data: {
        title: 'Student',
        updatedBy: 'Admin',
      },
    }),
  ]);

  // Seeding 3 Teachers with mock data
  const teachers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Teacher One',
        email: 'teacher.one@example.com',
        password: 'password123',
        phone: '+55 11 99999-1111',
        cpfcnpj: '11111111111',
        institution_id: institutions[0].id,
        role_id: roles[0].id, // Teacher role
        blocked: false,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Teacher Two',
        email: 'teacher.two@example.com',
        password: 'password123',
        phone: '+55 21 99999-2222',
        cpfcnpj: '22222222222',
        institution_id: institutions[1].id,
        role_id: roles[0].id, // Teacher role
        blocked: false,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Teacher Three',
        email: 'teacher.three@example.com',
        password: 'password123',
        phone: '+55 31 99999-3333',
        cpfcnpj: '33333333333',
        institution_id: institutions[2].id,
        role_id: roles[0].id, // Teacher role
        blocked: false,
      },
    }),
  ]);

  // Seeding 3 Students with mock data
  const students = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Student One',
        email: 'student.one@example.com',
        password: 'password123',
        phone: '+55 41 99999-4444',
        cpfcnpj: '44444444444',
        institution_id: institutions[0].id,
        role_id: roles[1].id, // Student role
        blocked: false,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Student Two',
        email: 'student.two@example.com',
        password: 'password123',
        phone: '+55 51 99999-5555',
        cpfcnpj: '55555555555',
        institution_id: institutions[1].id,
        role_id: roles[1].id, // Student role
        blocked: false,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Student Three',
        email: 'student.three@example.com',
        password: 'password123',
        phone: '+55 61 99999-6666',
        cpfcnpj: '66666666666',
        institution_id: institutions[2].id,
        role_id: roles[1].id, // Student role
        blocked: false,
      },
    }),
  ]);

  // Create 3 categories with mock data
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Category One',
        type: 1,
        updatedBy: 'Admin',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Category Two',
        type: 1,
        updatedBy: 'Admin',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Category Three',
        type: 1,
        updatedBy: 'Admin',
      },
    }),
  ]);

  // Create 3 keywords with mock data
  const keywords = await Promise.all([
    prisma.keyword.create({
      data: {
        word: 'KeywordOne',
        updatedBy: 'Admin',
      },
    }),
    prisma.keyword.create({
      data: {
        word: 'KeywordTwo',
        updatedBy: 'Admin',
      },
    }),
    prisma.keyword.create({
      data: {
        word: 'KeywordThree',
        updatedBy: 'Admin',
      },
    }),
  ]);

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
