/**
 * Check if we are using the dev version
 */
const dev = process.env.NODE_ENV !== 'production';

/**
 * Exports the base config
 */
module.exports = {
    application: {
        env: dev ? " (local)" : "",
        basePath: "/"
    },
    lockedPaths: [
        "/api/save",
        "/api/save/",
        "/api/random",
        "/api/random/"
    ]
};
