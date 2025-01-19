Frontend hosted on Vercel- Login using Github profile
Backend hosted on Cloudflare- Login using gauravmasand447@gmail.com
Database hosted on Aiven- Login using gsmasand447@gmail.com

Clone the repo locally
to make changes to backend
  
  npm install
  npx prisma migrate dev
  npx prisma generate --no-engine
  npm run dev (to run locally)
  npm run deploy (to deploy the changes to cloudflare, make sure that you are logged in using npx wrangler login)
  
for frontend
  make the necessary changes locally and then push to github. 
  Go to vercel and deploy the latest changes.
  
