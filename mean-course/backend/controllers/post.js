const PostModel = require('../models/post');

exports.savePost = (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
        imagePath: `${url}/images/${req.file.filename}`,
        creator: req.userData.userId
    });
    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: 'Post added successfuly!',
                post: {
                    ...createdPost,
                    id: createdPost._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a post failed!'
            });
        });
}

exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = `${req.protocol}://${req.get('host')}`;
        imagePath = `${url}/images/${req.file.filename}`;
    }
    const post = new PostModel({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    PostModel.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: 'Update successfuly' });
            } else {
                res.status(401).json({ message: 'Not authorized!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update post!"
            });
        });
}

exports.getAllPosts = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = PostModel.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery
        .then((documents) => {
            fetchedPosts = documents;
            return PostModel.count();
        }).then(count => {
            res.status(200).json({
                message: 'post fetched succesfully',
                posts: fetchedPosts,
                maxPosts: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching posts failed!"
            });
        });
}

exports.getPostById = (req, res, next) => {
    PostModel.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: 'post not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching post failed!"
            });
        });
}

exports.deletePostById = (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: 'Post deleted!' });
            } else {
                res.status(401).json({ message: 'Not authorized!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting post failed!"
            });
        });
}