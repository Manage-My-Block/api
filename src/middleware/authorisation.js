// Authorisation middleware for admin role
const authoriseAdminUsers = (req, res, next) => {
    // Check if admin, or check if user owns the id
    if (req.user.role.role !== 'admin' && req.user._id.toString() !== req.params.id) {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}

// Authorisation middleware for admin and committee roles
const authoriseCommitteeAdmin = (req, res, next) => {
    // Check for committee or admin roles
    if (req.user.role.role !== 'committee' && req.user.role.role !== 'admin') {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}

// Authorisation middleware for committee role
const authoriseCommittee = (req, res, next) => {
    // Check for committee role
    if (req.user.role.role !== 'committee') {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}

// Authorisation middleware for committee role
const authoriseAdmin = (req, res, next) => {
    // Check for committee role
    if (req.user.role.role !== 'admin') {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}

const authoriseOwner = (req, res, next) => {
    // Check if admin, or check if user owns the id
    if (req.user._id.toString() !== req.params.id) {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}

module.exports = { authoriseAdminUsers, authoriseCommitteeAdmin, authoriseCommittee, authoriseAdmin, authoriseOwner }