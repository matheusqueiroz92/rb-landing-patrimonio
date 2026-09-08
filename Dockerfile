# ============================================================================
# Dockerfile - rb-landing-patrimonio
# Multi-stage: Node build -> Nginx Alpine servindo dist/
# ============================================================================

FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

ARG VITE_SITE_URL=https://sucessoes.reboucasbulhoes.com
ARG VITE_WHATSAPP_NUMERO
ARG VITE_WHATSAPP_MENSAGEM
ARG VITE_AGENDAMENTO_URL
ARG VITE_GTM_ID
ARG VITE_META_PIXEL_ID

ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_WHATSAPP_NUMERO=$VITE_WHATSAPP_NUMERO
ENV VITE_WHATSAPP_MENSAGEM=$VITE_WHATSAPP_MENSAGEM
ENV VITE_AGENDAMENTO_URL=$VITE_AGENDAMENTO_URL
ENV VITE_GTM_ID=$VITE_GTM_ID
ENV VITE_META_PIXEL_ID=$VITE_META_PIXEL_ID

RUN npm run build

FROM nginx:alpine AS runner

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
