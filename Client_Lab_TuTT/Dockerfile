# Stage 1: Build the Angular application
FROM node:20 AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm ci

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --configuration=staging

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/tutt-client/browser /usr/share/nginx/html
COPY --from=build /app/dist/tutt-client/browser /etc/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
