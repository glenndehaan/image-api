const config = require("../config");

/**
 * Check if a bearer has been send
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    const urlParts = req.originalUrl.split("/");

    if (config.lockedPaths.includes(urlParts[2])) {
        if (req.method === "OPTIONS") {
            next();
            return;
        }

        if (typeof req.headers.authorization !== "undefined") {
            const token = req.headers.authorization.split("Bearer ")[1];

            if (config.authentication.includes(token)) {
                next();
            } else {
                res.type('application/json');
                res.status(403);
                res.json({'message': "Forbidden!"});
            }
        } else {
            res.type('application/json');
            res.status(401);
            res.json({'message': "Not authorized!"});
        }

        return;
    }

    next();
};
