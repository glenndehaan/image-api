/**
 * Import base packages
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');

/**
 * Import own packages
 */
const log = require("./logger");
const config = require("../config");
const apiRouter = require('../routers/Api');

class web {
    /**
     * Init the express app
     */
    init() {
        /**
         * Trust proxy
         */
        app.enable('trust proxy');

        /**
         * Enable compression
         */
        app.use(compression({ threshold: 0 }));

        /**
         * Serve static public dir
         */
        app.use(express.static(`${__dirname}/../../../public`));

        /**
         * Configure app to use bodyParser()
         */
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json({limit: '50mb'}));

        /**
         * Request logger
         */
        app.use((req, res, next) => {
            log.trace(`[WEB][REQUEST]: ${req.originalUrl}`);
            next();
        });

        /**
         * Configure routers
         */
        app.use('/api', apiRouter.router);

        /**
         * Setup default 404 message
         */
        app.use((req, res) => {
            res.status(404);

            // respond with json
            if (req.originalUrl.split('/')[1] === 'api') {

                /**
                 * API 404 not found
                 */
                res.send({error: 'This API route is not implemented yet'});
            }
        });

        /**
         * Disable powered by header for security reasons
         */
        app.disable('x-powered-by');

        /**
         * Start listening on port
         */
        app.listen(config.application.port, config.application.host, () => {
            log.info(`[WEB] App is running on: ${config.application.host}:${config.application.port}`);
        });
    }
}

module.exports = new web();
