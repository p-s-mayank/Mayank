const thought_template = require("../models/thought");
const user_template = require("../models/user");

const show_all_thoughts = async (req, res, next) => {
    thought_template.find({}, (err, data) => {
        if (!err) res.send(data);
        else console.log(err);
    });
};

const create_thought = async (req, res, next) => {
    const { title, content, anonymous } = req.body;
    if (!title || !content)
        return res.status(400).json({ message: "Please fill all the fields" });
    const data = { title, content };
    if (anonymous) data.anonymous = true;
    else {
        data.anonymous = false;
        data.by = {
            user_id: req.user.id,
            username: req.user.username,
        };
    }
    const thought = new thought_template(data);
    thought
        .save()
        .then((data) => {
            user_template.findOne({ _id: req.user.id }).then((user) => {
                user.thoughts.push(data._id);
                user.save();
            });
            res.json({ message: "Thought created successfully" });
        })
        .catch((err) => res.json({ message: "Error creating thought" }));
};

const delete_thought = async (req, res, next) => {
    thought_template.findOne({ _id: req.params.id }).then((data) => {
        if (data === null)
            res.status(404).json({ message: "Thought not found" });
        else {
            console.log(data._id);
            console.log(req.user.thoughts);
            if (req.user.thoughts.includes(data._id)) {
                thought_template
                    .deleteOne({ _id: req.params.id })
                    .then(() => {
                        user_template
                            .findOne({ _id: req.user.id })
                            .then((data) => {
                                data.thoughts.splice(
                                    data.thoughts.indexOf(req.params.id),
                                    1
                                );
                                data.save();
                            });
                        res.json({ message: "Thought deleted successfully" });
                    })
                    .catch((err) =>
                        res.json({ message: "Error deleting thought" })
                    );
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        }
    });
};

const reply_thought = async (req, res, next) => {
    const { content, anonymous } = req.body;
    thought_template.findOne({ _id: req.params.id }).then((data) => {
        if (data === null)
            res.status(404).json({ message: "Thought not found" });
        else {
            const reply = { content };
            if (anonymous) reply.anonymous = true;
            else {
                reply.anonymous = false;
                reply.by = {
                    user_id: req.user.id,
                    username: req.user.username,
                };
            }
            data.replies.push(reply);
            data.save().then((data) => {
                user_template.findOne({ _id: req.user.id }).then((user) => {
                    user.replies.push(
                        data.replies[data.replies.length - 1]._id
                    );
                    user.save();
                });
                res.json({ message: "Reply added successfully" });
            });
        }
    });
};

module.exports = {
    show_all_thoughts,
    create_thought,
    delete_thought,
    reply_thought,
};
