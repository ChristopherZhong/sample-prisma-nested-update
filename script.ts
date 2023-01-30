import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // create user with 2 posts
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: [{ title: "Hello 1" }, { title: "Hello 2" }],
      },
    },
    include: { posts: true },
  });
  console.log(user);
  const posts = user.posts.map(({ content, id, published, title }) => {
    return { content, id, published, title };
  });
  const updatedUser = await prisma.user.update({
    data: {
      name: "Alice (Updated)",
      posts: {
        create: [...posts, { content: "Content 3", title: "Hello 3" }],
        deleteMany: [{ authorId: user.id }],
      },
    },
    include: { posts: true },
    where: { id: user.id },
  });
  console.log(updatedUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
