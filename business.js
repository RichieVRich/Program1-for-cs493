/*
 *  This is the start to business.js
 *
 */
module.exports = function(){
    var express = require('express');
    var bus = require('./example_business.js');
    var router = express.Router();



    router.get('/', function(req,res){
        console.log("Business Main Envoked");
        console.log("List All Business");
        var page = parseInt(req.query.page) || 1;
        var limit = 10;
        var lastPage = Math.ceil(bus.bus.length / limit);
        page = page < 1 ? 1 : page;
        page = page > lastPage;
        var start = (page - 1) * limit;
        var end = start + limit;
        var result = bus.bus.slice(start, end);

        var links = {};
        if ( page < lastPage){
            links.nextPage = '?page=' + (page +1);
            links.lastPage = '?page=' + lastPage;
        }
        if ( page > 1){
            links.prevPage = '?page=' + (page - 1);
            links.firstPage = '?page=1';
        }

        res.status(200).json({
            pageNumber: page,
            totalPages: lastPage,
            pageSize: limit,
            totalCount: bus.bus.length,
            business: results,
            links: links
        });
    });

    router.post('/', function(req,res){
        if( req.body && req.body.name && req.body.street && req.body.city && req.body.state && req.body.zip && req.body.phone && req.body.category && req.body.subcat){
            bus.bus.push(req.body);
            var id = bus.bus.length - 1;
            res.status(201).json({
                id: id,
                links: {
                    business: '/business/' + id
                }
            });

        }else
            {
                res.status(400).json({
                    err: "Request needs name, street, city, state, zip, phone, category, subcat fields"
                });
            }
    });


    router.get('/:bid', function(req,res,next){
        console.log('specifc business id envoked');
        console.log('display all info for the particular business');
        var bid = parseInt(req.params.bid);

            if(bus.bus[bid]){
                res.status(200).json(bus.bus[bid]);
                 console.log(bus.bus[bid]);
        //        res.status(200).json(rev.getRev()[bid]);
          //      res.status(200).json(pho.getPho()[bid]);
            }
            else{
                next();
            }
    });

    router.put('/:bid', function(req,res,next){
        var bid = parseInt(req.params.bid);

            if(bus.bus[bid]){
                if( req.body && req.body.name && req.body.street && req.body.city && req.body.state && req.body.zip && req.body.phone && req.body.category && req.body.subcat){
                    bus.bus[bid] = req.body;
                    res.status(200).json({
                        links: {
                        business: '/business/' + bid
                         }
                     });
                }else{
                res.status(400).json({
                    err: "Request needs name, street, city, state, zip, phone, category, subcat fields"
                    });
                }

            }
            else{
                next();
            }
    });

    router.delete(':bid', function( req,res,next){
            var bid = parseInt(req.params.bid);
            if(bus.bus[bid]){
                bus.bus[bid] = null;
                res.status(204).end();
            }else{
                next();
            }
    });


    return router;
}();
