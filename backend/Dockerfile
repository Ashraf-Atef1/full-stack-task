# Backend Dockerfile
FROM node:24.5.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN yarn install --production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN yarn install

COPY . .
RUN npm run build

# Production image, copy all the files and run nest
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Install curl for health checks
RUN apk add --no-cache curl

RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs

# Copy built application
COPY --from=builder --chown=nestjs:nestjs /app/dist ./dist
COPY --from=builder --chown=nestjs:nestjs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nestjs /app/package.json ./package.json

# Copy i18n files
COPY --from=builder --chown=nestjs:nestjs /app/src/i18n ./src/i18n

# Create uploads directory with proper permissions
RUN mkdir -p uploads/apartments && chown -R nestjs:nestjs uploads

# Create entrypoint script to fix permissions at runtime
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'mkdir -p /app/uploads/apartments' >> /entrypoint.sh && \
    echo 'chown -R nestjs:nestjs /app/uploads' >> /entrypoint.sh && \
    echo 'chmod -R 755 /app/uploads' >> /entrypoint.sh && \
    echo 'exec su-exec nestjs "$@"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

# Install su-exec for user switching
RUN apk add --no-cache su-exec

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/main"]
