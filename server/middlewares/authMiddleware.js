import { clerkClient } from "@clerk/express"

// ✅ Protect Educator Routes
export const protectEducator = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        
        const response = await clerkClient.users.getUser(userId)

        if (response.publicMetadata.role !== 'educator') {
            return res.json({ success: false, message: 'Unauthorized Access: Educator role required' })
        }
        
        next()

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ✅ Protect Admin Routes
export const protectAdmin = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        
        const response = await clerkClient.users.getUser(userId)

        if (response.publicMetadata.role !== 'admin') {
            return res.json({ success: false, message: 'Admin access required' })
        }
        
        next()

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
