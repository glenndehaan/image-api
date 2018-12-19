/**
 * Import base packages
 */
const express = require('express');
const router = express.Router();
const routerUtils = require('../modules/router');

/**
 * Define routes
 */
const routes = [
    {
        route: '/',
        method: 'get',
        controller: 'Index',
        action: 'index',
    },
    {
        route: '/save',
        method: 'post',
        controller: 'Image',
        action: 'save',
    },
    {
        route: '/random',
        method: 'get',
        controller: 'Image',
        action: 'random',
    },
    {
        route: '/random/:type',
        method: 'get',
        controller: 'Image',
        action: 'getRandomByType',
    },
];

routerUtils.routesToRouter(router, routes, 'Api');

module.exports = { router, routes };
