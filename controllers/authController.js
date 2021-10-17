const User = require("../models/user");
const jwt = require("jsonwebtoken");

const handleError = (err) => {
    let errors = { email: "", password: "" };

    //Duplicate error code
    if (err.code === 11000) {
        errors.email = "This email is already registered";
        //Return before checking anything else if it's already registered
        return errors;
    }
    //Login incorrect data
    if (err.message === "incorrect email or password") {
        errors.email = "Incorrect email or password";
        return errors;
    }

    //Validation Error
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

const maxAge = 60 * 60 * 24 * 30; //JWT expect seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.INN_JWT, {
        expiresIn: maxAge,
    });
};

module.exports.signup_get = (req, res) => {
    res.render("auth/signup", {
        title: "Signup | Innected",
        link: "/signup",
    });
};
module.exports.login_get = (req, res) => {
    res.render("auth/login", {
        title: "Login | Innected",
        link: "/login",
    });
};
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie("innected", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: true,
        });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
};
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("innected", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: true,
        });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = async (req, res) => {
    res.cookie("innected", "", { httpOnly: true, maxAge: 1 });
    res.redirect("/");
};
