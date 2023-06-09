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
    // {
    //     method: 'GET',
    //     path: '/',
    //     handler: (request,h) =>{
    //         const {name, location} = request.query;
    //         return `Halo, ${name}! Apa kabar di ${location}?`;
    //     }
    // },
    {
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
            const {name = "stranger"} = request.params;
            const {lang} = request.query;

            if(lang === 'id'){
                return `Halo, ${name}!`;
            } else {
                return `Hello, ${name}!`;
            }
        }
    },
];

module.exports = routes;