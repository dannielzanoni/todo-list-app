# Use official node image as the base image
FROM node:20 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build --prod

# Stage 2: Serve app using a simple HTTP server
FROM node:20

# Set the working directory
WORKDIR /usr/local/app

# Copy build output
COPY --from=build /usr/local/app/dist/todo-list-app/browser /usr/local/app

# Install serve to serve the Angular application
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", ".", "-l", "3000"]
