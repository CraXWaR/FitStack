import {seedUser} from "./user.seeder.js";
import {seedExercises} from "./exercise.seeder.js";

import prisma from "../../src/lib/prisma.js";

async function main() {
    console.log("Running seeders...");

    await seedUser(prisma);
    await seedExercises(prisma);

    console.log("All seeds completed");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});