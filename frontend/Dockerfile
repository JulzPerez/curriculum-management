# 1. Use Node.js 18 as the base
FROM node:24-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package definitions first
COPY package.json package-lock.json* ./

# 4. Install Node libraries
RUN npm install

# 5. Copy the rest of the code
COPY . .

# 6. Start Next.js in development mode
CMD ["npm", "run", "dev"]
