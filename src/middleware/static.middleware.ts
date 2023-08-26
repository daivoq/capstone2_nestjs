import { Express, static as expressStatic } from 'express';

export function setupStaticMiddleware(app: Express) {
    app.use(expressStatic('.'));
}