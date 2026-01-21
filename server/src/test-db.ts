import 'dotenv/config';
import {prisma} from "./lib/prisma.js";

async function main() {
    console.log('🚀 Стартиране...');

    const user = await prisma.user.create({
        data: {
            email: 'iron_pump@fitstack.com',
            password: 'secure_password_123',
            firstName: 'Fitness',
            lastName: 'Beast',
        },
    });

    console.log('✅ Потребителят е създаден успешно:');
    console.table(user);
}

main()
    .catch((e) => {
        console.error('❌ Грешка при записа:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

async function getDatabase() {
    const users = await prisma.user.findMany({});
    console.table(users);
}

getDatabase()
    .catch((e) => {
        console.error('❌ Грешка при записа:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })