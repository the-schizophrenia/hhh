import { Router } from 'express';

const _Router = class Routes extends Router {
    constructor() {
        super();

        this.get('/', function (req, res) {

            return res.render('home.ejs')
        });
    }
};
export { _Router as Router };

export const page = '/';