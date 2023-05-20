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
});

