const passportJwt = require('passport-jwt');

let ExtractJwt = passportJwt.ExtractJwt;
let JwtStrategy = passportJwt.Strategy;
let JwtOptions = {};
JwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
JwtOptions.secretOrKey = "BKAPXYZ";

let strategy = new JwtStrategy(JwtOptions, function(data, next){
    console.log(data);

    if (data) {
        next(null, data);
    } else {
        next(null, false);
    }
});

module.exports = strategy;