const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        }
    },
    {
        method: 'GET',
        path:'/about',
        handler: (request, h) => {
            return 'About Page';
        }
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan'
        }
    },
    {
        method:'GET',
        path: '/helo/{username?}',
        handler: (request, h) => {
            const {username = "strangers"} = request.params;
            return `Helo ${username}`;
        }
    },
];

module.exports = routes;