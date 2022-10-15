const Product = require('../model/product');

async function routes (fastify,option) {

    fastify.get('/', (request, reply) => {
        reply.send({ hello: 'world' })
      })

    fastify.post('/add', async (request,replay) => {
        try {
            const data = await Product.create(request.body)
            return replay.send({
                result:data
            });    
        } catch (error) {
            return replay.send(error)
        }
    })

    fastify.get('/get-products', async (request,replay) => {
        try {
            const data = await Product.find()
            return replay.send({
                result:data
            });    
        } catch (error) {
            return replay.send(error)
        }
    })

    fastify.get('/get-single-products/:id', async (request,replay) => {
        try {
            const _id = request.params.id;
            const data = await Product.findOne({_id})
            if(!data){
                return replay.send({
                    message:"wrong id"
                });
            }
            return replay.send({
                result:data
            });
        } catch (error) {
            return replay.send(error)
        }
    })

    fastify.put('/update', async (request,replay) => {
        try {
            const _id = request.body._id
            const data = await Product.findByIdAndUpdate({_id},request.body,{new:true})
            if(!data){
                return replay.send({
                    message:"wrong id"
                });    
            }
            return replay.send({
                result:data
            });    
        } catch (error) {
            return replay.send(error)
        }
    })

    fastify.delete('/delete',async (request,replay) => {
        try {
            const _id = request.body._id
            const data = await Product.findByIdAndDelete({_id},request.body);
            console.log(data);
            if(!data){
                return replay.send({
                    message:"no product found in this id"
                });    
            }
            return replay.send({
                result:data
            });    
        } catch (error) {
            return replay.send(error)
        }
    })
}

module.exports = routes;