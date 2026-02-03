import type {PrismaClient} from "@prisma/index.js";
import bcrypt from "bcrypt";

export async function seedUser(prisma: PrismaClient) {
    console.log("Seeding user...");

    const password = await bcrypt.hash('123',12);

    await prisma.user.create({
        data: {
            email: "test@gmail.com",
            password,
            firstName: "Test",
            lastName: "User"
        }
    });

    console.log("User created");
}