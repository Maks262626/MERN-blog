import jwt from 'jsonwebtoken';
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (!token) {
        return res.status(403).json({
            message: "no access",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

        req.userId = decoded._id;
        next();
    } catch (e) {
        return res.status(403).json({
            message: "no access",
        });
   }
}