const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        const secret = process.env.JWT_SECRET || "The little boy jumped to see such fun, & the dish ran away with the spoon!";

        jwt.verify(authorization, secret, function(err, decodedToken) {
            if (err) {
                res
                .status(401)
                .json({ message: "You shall not pass!"})
            } else {
                req.token = decodedToken
                next();
            }
        });
    } else {
        res
        .status(400)
        .json({ message: "Please login and try again."})
    }
};