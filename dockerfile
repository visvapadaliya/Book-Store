# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
