import { readdirSync } from 'fs';
import express, { json, urlencoded } from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { env } from 'process';

export class WebHhye {
    constructor() {
        this.app = express();
        this.start();
        this.login();
    }

    start() {
        this.app.use(json());
        this.app.set('view engine', 'ejs');
        this.app.use(urlencoded({ extended: false }));
        this.app.use(expressLayouts);
        this.app.use((req, res, next) => {
            next();
        });

        this.app.set('views', path.join('./src', 'pages'));

        this.app.use(express.static(path.join('./src', 'utils')));

        this.app.listen(env.PORT, () => {
            console.log('Server listening on port 8080');
        });
    }

    async login() {
        const files = readdirSync('./src/routes/').filter(file => file.endsWith('.js'));
        let count = 0;

        for (const file of files) {
            const route = (await import(`./routes/${file}`))

            this.app.use(route.page, new route.Router());
            count++;
        }
        console.log(`${count} pages launched`)
    }
}