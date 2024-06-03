import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify} from "hono/jwt";

export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
      userId:string
  }
}>();

bookRouter.use("/*", async(c,next) =>{
	const authHeader = c.req.header("authorization") ||"";
	const user = await verify(authHeader, c.env.JWT_SECRET);
	if(user){
		c.set("userId",user.id);
		await next();
	}else{
		c.status(403);
		return c.json({
			message:"You are not logged in"
		})
	}
})

bookRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: Number(userId)
		}
	});
	return c.json({
		id: post.id
	});
})
bookRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	await prisma.post.update({
		where: {
			id: body.id,
			authorId: Number(userId)
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

// bookRouter.get('/bulk', async (c) => {
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());
	
// 	const posts = await prisma.post.findMany({
// 		select:{
// 			content:true,
// 			title:true,
// 			id:true,
// 			author:{
// 				select:{
// 					name:true
// 				}
// 			}
// 		}
// 	});

// 	return c.json(posts);
// })

bookRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

	return c.json(posts);
})


bookRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id:Number(id)
		},
		select: {
			id: true,
			title: true,
			content: true,
			author: {
				select: {
					name: true
				}
			}
		}
	});

	return c.json(post);
})

bookRouter.delete('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();

	return c.json({"msg":"deleted"});
})

