const {getUser} = require("../service/auth");

async function restrictToLoggedinUSerOnly(req,res,next){
    const userid = req.cookies?.uid;

    if(!userid) return res.redirect('/login');
    const user = getUser(userid);

    if(!user) return res.redirect("/login");
    req.user = user;
    next();

}



async function checkauth(req,res,next){
    const userid = req.cookies?.uid;

    const user = getUser(userid);

   
    req.user = user;
    next();
}
module.exports = {
    restrictToLoggedinUSerOnly,
    checkauth,
}