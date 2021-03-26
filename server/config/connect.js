const mongoose = require('mongoose')


const connect = async () => {
    try {
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        console.log('connection created');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect