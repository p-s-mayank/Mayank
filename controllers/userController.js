const user_template_copy = require("../models/registered_users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const show_users = async (request, response, next) => {
    user_template_copy.find({}, (err, data) => {
        if (!err) response.send(data);
        else console.log(err);
    });
};

const get_user = async (req, res) => {
    const id = req.params.id
    user_template_copy
        .findOne({ _id: id })
        .then((data) => {
            if (data === null)
                res.status(404).json({ message: "User not found!" });
            else res.send(data);
        })
        .catch((err) =>
            res.status(500).json({ message: "Item could not be shown!" })
        );
};

const add_user = async (request, response, next) => {
    const { username, password } =
        request.body;
    if (!username || !password)
        return response
            .status(422)
            .json({ message: "Please fill out all the fields!" });
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, saltPassword);
    await user_template_copy
        .findOne({ username: username })
        .then((userExist) => {
            if (userExist) {
                return response
                    .status(402)
                    .json({ message: "User Already Exists!" });
            }
            const user = new user_template_copy({
                username,
                password: securePassword,
            });
            user.save()
                .then((res) => {
                    response
                        .status(201)
                        .json({ message: "User Registered Successfully!" });
                })
                .catch((error) => {
                    response
                        .status(401)
                        .json({ message: "Registeration Failed!" });
                });
        });
};

const login = async (request, response, next) => {
    try {
        let token;
        const { username, password } = request.body;
        if (!username || !password)
            return response
                .status(402)
                .json({ message: "Please fill out all the fields!" });

        const userLogin = await user_template_copy.findOne({
            username: username,
        });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                response.status(401).json({ message: "Invalid Credentials" });
            } else {
                token = await userLogin.generateAuthToken();
                response.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 30*12*60*60*1000), // 30 days
                    httpOnly: true,
                });
                response
                    .status(201)
                    .json({ message: "User Sign in successfully",token });
            }
        } else {
            response.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        response.status(404).json(error);
    }
};

module.exports = {
    show_users,
    add_user,
    login,
    get_user,
};
