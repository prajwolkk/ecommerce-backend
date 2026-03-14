import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';  // ← import so PrismaService is available

@Module({
    imports: [
        TerminusModule,
        PrismaModule,
    ],
    controllers: [HealthController],
})
export class HealthModule { }
