// Full updated health.controller.ts (only changed catch blocks)

import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckService,
    HealthIndicatorResult,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private prisma: PrismaService,
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            async (): Promise<HealthIndicatorResult> => {
                try {
                    await this.prisma.$queryRaw`SELECT 1`;
                    return { database: { status: 'up' } };
                } catch (error) {
                    // Narrow type safely
                    const message = error instanceof Error ? error.message : String(error);
                    return { database: { status: 'down', message } };
                }
            },
        ]);
    }

    @Get('ready')
    @HealthCheck()
    ready() {
        return this.health.check([
            async (): Promise<HealthIndicatorResult> => {
                try {
                    await this.prisma.user.count({ take: 1 });
                    return { database: { status: 'up' } };
                } catch (error) {
                    // Narrow type safely
                    const message = error instanceof Error ? error.message : String(error);
                    return { database: { status: 'down', message } };
                }
            },
        ]);
    }
}