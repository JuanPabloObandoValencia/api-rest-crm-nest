import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Roles
    const role = await prisma.role.create({
        data: { name: 'Usuario', description: 'Rol por defecto' },
    });

    // Usuarios
    const users = await prisma.user.createMany({
        data: [
            {
                first_name: 'Juan',
                first_last_name: 'Pérez',
                email: 'juan@example.com',
                phone: '3216549870',
                password: '123456',
                role_id: role.id,
            },
            {
                first_name: 'Ana',
                first_last_name: 'Gómez',
                email: 'ana@example.com',
                phone: '3001112233',
                password: '123456',
                role_id: role.id,
            },
            {
                first_name: 'Pedro',
                first_last_name: 'Ruiz',
                email: 'pedro@example.com',
                phone: '3229998888',
                password: '123456',
                role_id: role.id,
            },
        ],
    });

    await prisma.project.createMany({
        data: [
            { name: 'Desarrollo Web', description: 'Sitio corporativo', created_by: 1 },
            { name: 'Marketing Digital', description: 'Campañas y redes sociales', created_by: 1 },
            { name: 'Diseño UX/UI', description: 'Diseño de interfaces', created_by: 1 },
        ],
    });

    await prisma.taskStatus.createMany({
        data: [
            { name: 'Por Hacer', color: '#F59E0B' },
            { name: 'En Progreso', color: '#6366F1' },
            { name: 'Completada', color: '#10B981' },
        ],
    });

    await prisma.taskPriority.createMany({
        data: [
            { name: 'Baja', color: '#9CA3AF' },
            { name: 'Media', color: '#FBBF24' },
            { name: 'Alta', color: '#EF4444' },
        ],
    });
}

main()
    .then(async () => {
        console.log('Seed completado');
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
