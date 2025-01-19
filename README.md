## Project Setup

### Frontend
- Hosted on **Vercel**
- Login using **GitHub profile**

### Backend
- Hosted on **Cloudflare**
- Login using **gauravmasand447@gmail.com**

### Database
- Hosted on **Aiven**
- Login using **gsmasand447@gmail.com**


**Clone the repository** locally to make changes to the backend.
   
## Steps for Backend
  - npm install
  - npx prisma migrate dev
  - npx prisma generate --no-engine
  - npm run dev (to run locally)
  - npm run deploy (to deploy the changes to cloudflare, make sure that you are logged in using npx wrangler login)

  
## Steps for frontend
  - make the necessary changes locally and then push to github. 
  - Go to vercel and deploy the latest changes.
  
