import 'dotenv/config';
import prisma from "./lib/prisma.js";

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

    const exercisesData = [
        { name: 'Bench Press', category: 'Chest' },
        { name: 'Squat', category: 'Legs' },
        { name: 'Deadlift', category: 'Back' },
        { name: 'Overhead Press', category: 'Shoulders' },
        { name: 'Barbell Row', category: 'Back' },
    ];

    const exercises = await Promise.all(
        exercisesData.map((ex) =>
            prisma.exercise.create({ data: ex })
        )
    );

    console.log('✅ Упражненията са създадени успешно:');
    console.table(exercises);
}

main()
    .catch((e) => {
        console.error('❌ Грешка при записа:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// optional: show current users
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
    });
