//Here you will import route files and export them as used in previous labs
import movieRoutes from './movies.js';
import path from 'path';
import {static as staticDir} from 'express';
const constructorMethod = (app) => {
    app.use('/', movieRoutes);
    app.get('/about', (req, res) => {
        res.sendFile(path.resolve('static/about.html'));
    });
    app.use('/public', staticDir('public'));
    app.use('*', (req, res) => {
        res.redirect('/');
    });
}

export default constructorMethod;