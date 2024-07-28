handle=async(req, res, next)=>{
    try{
        console.log('hello from upload')
        await next()
    }
    catch(err){
        console.error('error:',err)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

module.exports=handle