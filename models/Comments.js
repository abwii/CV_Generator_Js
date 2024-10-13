const mongoose = required("mogoose");

const commentSchema = new mongoose.Schema(
    {
        comment: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            cv: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CV",
                required: true
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);