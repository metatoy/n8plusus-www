FROM node:20-slim
WORKDIR /app

# curl is needed for the Coolify container healthcheck (node:20-slim ships without it)
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY server.js ./
COPY public ./public

ENV PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
