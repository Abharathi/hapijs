'use strict';

const Hapi = require('@hapi/hapi');
const  MySQL = require('mysql');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    var books=[{
        id:1,
        title:'hindubook',
        author:'jack',
    },
    {
        id:2,
        title:'wings of fire',
        author:'abdul kalam',
    },
    {
        id:3,
        title:'knowledge power',
        author:'gandhi',
    },
    {
        id:4,
        title:'manspower',
        author:'nahru',
    }]

    server.route({
        method: 'GET',
        path:'/api/books',
        handler: function(request, reply){

            return books;
        }
    });
    server.route({
        method: 'POST',
        path: '/api/books',
        handler: function (request,reply) {
    
            var newbook = request.payload;
            books.push(newbook);
            return books;
        }
        });
        server.route({
            method: 'PUT',
            path: '/api/books/{id}',
            handler: function (request,reply) {
        
                var id=request.params.id;
                var updatedBook=books.filter((obj)=>{
                    return obj.id==id;
                })
                updatedBook[0].title=request.payload.title;
                return updatedBook;
            }
            });
            server.route({
                method: 'DELETE',
                path: '/api/books/{id}',
                handler: function (request,reply) {
            
                    var id=request.params.id;
                    var deletedBook=books.filter((obj)=>{
                        return obj.id!=id;
                    })
                    deletedBook[0].title=request.payload.title;
                    return deletedBook;
                }
                });
    

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();