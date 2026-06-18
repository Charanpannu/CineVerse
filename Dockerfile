# Use the official NGINX image
FROM nginx:alpine

# Remove the default NGINX index page
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy our static website files (HTML, CSS, JS, Assets) to the NGINX folder
COPY . /usr/share/nginx/html

# Expose port 80 for the server
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
