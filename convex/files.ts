import { v, ConvexError } from "convex/values"
import { query, mutation } from "./_generated/server"

export const createFile = mutation({
    args:{
        name: v.string()
    },
    async handler(ctx, args){
        const identity = await ctx.auth.getUserIdentity()

        if(!identity){
            throw new ConvexError("Not authorized")
        }
        await ctx.db.insert("files",{
            name: args.name
        })
    }
})

export const getFiles = query({
    args: {},
    async handler(ctx, args){
        const identity = await ctx.auth.getUserIdentity()

        if(!identity){
            return []
        }
        return ctx.db.query("files").collect()
    }
})