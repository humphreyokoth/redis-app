app.post('/posts', async(req,res)=>{
    const post = req.body;
    try {
        const result = await db.collection('posts').insertOne(post);
        res.status(201).json({id:result.insertId});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"An error occured while creating the post"})
    }
});

app.get('/posts',async (req, res) => {
    //Data control from Redis cache 
    redisClient.get('posts',async(err,cachedData)=>{
        if (err) throw err;
        if (cachedData) {
            res.status(200).json(JSON.parse(cachedData));
            
        } else {
            try {
                const posts = await db.collection('posts').find().toArray();
                // Addding data to redis cache
                redisClient.set('posts', JSON.stringify(posts));
                res.status(200).json(posts);
            } catch (error) {
                console.log(error);
                res.status(500).json({error:"An error occured while fetching the posts"})
            }
        }
        
    })
});

app.put('/posts/:id',async(req,res)=>{
    const postId = req.params.id;
    const updatedPost =req.body.updated;

    try {
        const result = await db.collection('posts').updatedOne({_id:new ObjectId(postId)},{$set:updatedPost});
        if (result.modifiedCount === 0) {
            return res.status(404).json({error:'Post not found'});
        }
          // Clear data in Redis cache when update is done
          redisClient.del('posts');
          res.status(200).json({message:'Post Updated'})
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"An error occured while updating the post"});
    }
})