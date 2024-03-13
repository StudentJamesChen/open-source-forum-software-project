'use strict';

const express = require('express');
const winston = require('winston');

const uploadsController = require('../controllers/uploads');
const helpers = require('./helpers');
const { upload } = require('./uploadConfig');

module.exports = function (app, middleware, controllers) {
    const middlewares = [middleware.authenticateRequest];
    const router = express.Router();

    // Serve resumes under static directory
    app.use('/static', express.static('uploads'));
    app.use('/api', router);

    // POST route to upload files to disk
    router.post('/file', upload.single('filename'), (req, res) => {
        if (req.file) {
            res.send('File Uploaded');
        } else {
            res.send('File Uploaded Unsuccessfully');
        }
    });

    router.get('/config', [...middlewares, middleware.applyCSRF], helpers.tryRoute(controllers.api.getConfig));

    router.get('/self', [...middlewares], helpers.tryRoute(controllers.user.getCurrentUser));
    router.get('/user/uid/:uid', [...middlewares, middleware.canViewUsers], helpers.tryRoute(controllers.user.getUserByUID));
    router.get('/user/username/:username', [...middlewares, middleware.canViewUsers], helpers.tryRoute(controllers.user.getUserByUsername));
    router.get('/user/email/:email', [...middlewares, middleware.canViewUsers], helpers.tryRoute(controllers.user.getUserByEmail));

    router.get('/user/:userslug/export/posts', [...middlewares, middleware.authenticateRequest, middleware.ensureLoggedIn, middleware.checkAccountPermissions, middleware.exposeUid], helpers.tryRoute(controllers.user.exportPosts));
    router.get('/user/:userslug/export/uploads', [...middlewares, middleware.authenticateRequest, middleware.ensureLoggedIn, middleware.checkAccountPermissions, middleware.exposeUid], helpers.tryRoute(controllers.user.exportUploads));
    router.get('/user/:userslug/export/profile', [...middlewares, middleware.authenticateRequest, middleware.ensureLoggedIn, middleware.checkAccountPermissions, middleware.exposeUid], helpers.tryRoute(controllers.user.exportProfile));

    // Deprecated, remove in v1.20.0
    router.get('/user/uid/:userslug/export/:type', (req, res) => {
        winston.warn(`[router] \`/api/user/uid/${req.params.userslug}/export/${req.params.type}\` is deprecated, call it \`/api/user/${req.params.userslug}/export/${req.params.type}\`instead.`);
        res.redirect(`/api/user/${req.params.userslug}/export/${req.params.type}`);
    });

    router.get('/categories/:cid/moderators', [...middlewares], helpers.tryRoute(controllers.api.getModerators));
    router.get('/recent/posts/:term?', [...middlewares], helpers.tryRoute(controllers.posts.getRecentPosts));
    router.get('/unread/total', [...middlewares, middleware.ensureLoggedIn], helpers.tryRoute(controllers.unread.unreadTotal));
    router.get('/topic/teaser/:topic_id', [...middlewares], helpers.tryRoute(controllers.topics.teaser));
    router.get('/topic/pagination/:topic_id', [...middlewares], helpers.tryRoute(controllers.topics.pagination));

    const multipart = require('connect-multiparty');
    const multipartMiddleware = multipart();
    const postMiddlewares = [
        middleware.maintenanceMode,
        multipartMiddleware,
        middleware.validateFiles,
        middleware.uploads.ratelimit,
        middleware.applyCSRF,
    ];

    router.post('/post/upload', postMiddlewares, helpers.tryRoute(uploadsController.uploadPost));
    router.post('/user/:userslug/uploadpicture', [
        ...middlewares,
        ...postMiddlewares,
        middleware.exposeUid,
        middleware.ensureLoggedIn,
        middleware.canViewUsers,
        middleware.checkAccountPermissions,
    ], helpers.tryRoute(controllers.accounts.edit.uploadPicture));
};
