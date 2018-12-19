/**
 * Import external modules
 */
const fs = require("fs");

/**
 * Import own modules
 */
const log = require("./modules/logger");
const web = require("./modules/web");

/**
 * Check if we are running as dev
 */
const dev = process.env.NODE_ENV !== 'production';

log.info("[SYSTEM] App running");
log.info(`[SYSTEM] Support and Help: https://github.com/glenndehaan/`);

/**
 * Check if this is the first time running the app
 */
if(!dev) {
    if (!fs.existsSync(`${process.cwd()}/LICENCE`) || !fs.existsSync(`${process.cwd()}/README.md`)) {
        fs.writeFileSync(process.cwd() + '/LICENCE', fs.readFileSync(__dirname + '/../../LICENCE', 'utf8'));
        fs.writeFileSync(process.cwd() + '/README.md', fs.readFileSync(__dirname + '/../../README.md', 'utf8'));

        log.info("------------------------------------------");
        log.info("Hi and thank you for using this piece of software!");
        log.info("Go ahead and update the config.json to your needed then relaunch the software!");
        log.info("The software will close in 5 seconds!");
        log.info("------------------------------------------");

        setTimeout(() => {
            process.exit(0);
        }, 5000)
    } else {
        web.init();
    }
} else {
    web.init();
}
