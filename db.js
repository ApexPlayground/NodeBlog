const mongoose = require('mongoose')
const db = (async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/NodeBlog', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
})();
module.export = db;
