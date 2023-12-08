module.exports.setFlash=(req,res,next)=>{
    res.locals.flash={
        'success': req.flash('success'), //response key: req.flash('key)
        'error' : req.flash('error')
    }
    next();
}
