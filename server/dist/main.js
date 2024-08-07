"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const process = require("process");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const baseDir = __dirname.includes('dist')
        ? (0, path_1.join)(__dirname, '..')
        : __dirname;
    app.use('/public', express.static('public'));
    app.enableCors({
        origin: 'http://localhost:4200',
    });
    await app.listen(3000);
    const folderPath = (0, path_1.join)(baseDir, 'public', 'uploads');
    async function handleExit(signal) {
        console.log(`Received ${signal}. Clearing and exiting`);
        await clearFolder(folderPath);
        process.exit();
    }
    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
}
bootstrap();
async function clearFolder(folderPath) {
    try {
        const files = await (0, promises_1.readdir)(folderPath);
        for (const file of files) {
            await (0, promises_1.unlink)((0, path_1.join)(folderPath, file));
        }
        console.log('Folder cleared successfully');
    }
    catch (error) {
        console.error('Error clearing folder:', error);
    }
}
//# sourceMappingURL=main.js.map