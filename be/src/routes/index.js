const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const factoryRouter = require('./factoryRouter');
const labRouter = require('./labRouter');
const deliveryRouter = require('./deliveryRouter');
const guaranteeRouter = require('./guaranteeRouter');


function route(app) {
    app.use('/user', userRouter);
    app.use('/book', bookRouter);
    app.use('/factory', factoryRouter);
    app.use('/lab', labRouter);
    app.use('/delivery', deliveryRouter);
    app.use('/guarantee', guaranteeRouter);
}

module.exports = route;