const showHomePage = (req, res) => {
    res.render('index');
}
const createPost = (req, res) => {
    res.render('add_post');
}

module.exports = {
    showHomePage,createPost
}

