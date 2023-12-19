FROM node:16.18.1-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json audit-resolve.json ./
RUN npm install -g npm-audit-resolver@next
RUN npm install snap && npm ci
RUN check-audit --omit=dev --audit-level=moderate

FROM node:16.18.1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_FDK_PORTAL_HOST
ENV NEXT_PUBLIC_FDK_PORTAL_HOST ${NEXT_PUBLIC_FDK_PORTAL_HOST}
ENV NEXT_TELEMETRY_DISABLED 1
# Production image, copy all the files and run next
RUN npm run build

FROM node:16.18.1-alpine AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

ENV PORT 8080

CMD ["node", "server.js"]
