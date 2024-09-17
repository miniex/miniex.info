# Use Bun as the base image
FROM oven/bun:latest as builder

WORKDIR /app

# Install dependencies
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

# Build the Vite project
RUN bun run build

# Use a smaller base image for the final stage
FROM oven/bun:1-alpine

WORKDIR /app

# Copy the built assets and necessary files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY server.ts ./server.ts

# Install only production dependencies
RUN bun install --production --frozen-lockfile

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["bun", "run", "server.ts"]
