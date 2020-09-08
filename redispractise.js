const express = require('express');
const app = express();
var redis = require('redis');
var redisclient = redis.createClient();

var databases= [];

//kontroller
    redisclient.on('connect', function () {
        console.log('Redis baglandi');
        });

    redisclient.on('error', function () {
        console.log('Redis saglikli calismiyor');
        });


    redisclient.lrange('databases', 0, -1, function(err, reply) {
        console.log(reply); // ['redis', 'memchaced'] From db
        databases.push(reply);
        });
        
        /*   EKLEME YAPMAK İÇİN KULLANILABİLİR
        redisclient.rpush(['databases', 'redis', 'memcached'], function(err, reply) {
            console.log("ekleme yapildi"); 
            console.log(redisclient.lrange('databases' , 0, 0)); 
        });

        */
    

    app.get('/', (req, res) => {
        res.send("selam arkadas :)");
    });


    app.get('/redis', (req, res) => {
    
        res.send(databases);
   });



   app.listen(3000, () => {
        console.log('REDIS için baslatildi...');
   });