const appError =  require("../Error/appError")

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new appError("Unauthorized", 403)
            )
        }
        next()
    }
}

// exports.authorize = (...roles) =>{
//     const allowedRoles = Set(roles);

//     return(req, res, next) => {
//         if(!isAuthorized(allowedRoles)){
//             return new appError("Unthorized", 403)
//         }
//         next()
//     }
// }

// function isAuthorized(userRoles, allowedRoles){
//     return userRoles.some(role => allowedRoles.has(role))
// }