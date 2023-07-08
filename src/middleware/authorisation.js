// Authorisation middleware for admin role
module.exports.authoriseAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};

// Authorisation middleware for moderator role
module.exports.authoriseModerator = (req, res, next) => {
    if (req.user.role === 'moderator' || req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};

// Authorisation middleware for regular user role
module.exports.authoriseUser = (req, res, next) => {
    if (req.user.role === 'user' || req.user.role === 'moderator' || req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};
