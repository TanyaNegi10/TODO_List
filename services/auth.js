const jwt=require("jsonwebtoken");
const secret="taniya@123#";

exports.setUser=(user)=>{
    const payload={
        _id: user._id,
        email: user.email,
    };
    return jwt.sign(payload,secret);
};

exports.getUser=(token)=>{
    if(!token)
    {
        return null;
    }
    return jwt.verify(token,secret);
};

