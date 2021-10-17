const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
    const token = req.cookies.innected;

    //check jwt exists and is verified
    if (token) {
        jwt.verify(token, process.env.INN_JWT, (err, decodedToken) => {
            if (err) {
                res.redirect("/login");
            } else {
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

const inverseAuth = (req, res, next) => {
    const token = req.cookies.innected;

    //checks if the user is already logged in
    if (token) {
        jwt.verify(token, process.env.INN_JWT, (err, decodedToken) => {
            if (err) {
                next();
            } else {
                res.redirect("/");
            }
        });
    } else {
        next();
    }
};

const requireAdmin = (req, res, next) => {
    const token = req.cookies.innected;

    //check jwt exists and is verified
    if (token) {
        jwt.verify(token, process.env.INN_JWT, async (err, decodedToken) => {
            if (err) {
                res.redirect("/podcast");
            } else {
                let user = await User.findById(decodedToken.id);
                if (user.is_admin) {
                    next();
                } else {
                    res.redirect("/podcast");
                }
            }
        });
    } else {
        res.redirect("/login");
    }
};

//Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.innected;

    if (token) {
        jwt.verify(token, process.env.INN_JWT, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, inverseAuth, requireAdmin, checkUser };
