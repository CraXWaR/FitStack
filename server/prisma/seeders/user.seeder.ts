import type {PrismaClient} from "../../prisma/generated/prisma/index.js";
import bcrypt from "bcrypt";

export async function seedUser(prisma: PrismaClient) {
    console.log("Seeding user...");

    const password = await bcrypt.hash('123', 12);

    await prisma.user.upsert({
        where: {email: "test@gmail.com"},
        update: {},
        create: {
            email: "test@gmail.com",
            password,
            firstName: "Test",
            lastName: "User"
        },
    });
    
    console.log("User created");
}