module.exports = (theFunc)=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next);
    //next is bascially a callback function that will work when the promise is not resolved
}