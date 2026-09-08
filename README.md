# Landing — Holding Familiar e Empresarial

Página institucional da Rebouças & Bulhões Assessoria Empresarial sobre holding familiar e planejamento sucessório.

Publicação: [sucessoes.reboucasbulhoes.com](https://sucessoes.reboucasbulhoes.com)

O texto da página é informativo, nos termos do Provimento nº 205/2021 da OAB. Não altere o conteúdo jurídico para incluir honorários, depoimentos, promessas de resultado ou economia tributária garantida.

## Stack

- Vite 8, React 19 e TypeScript
- Tailwind CSS 4
- Motion (`motion/react`) e Lucide
- Nginx (produção) e Docker Compose com Traefik

## Desenvolvimento

```bash
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor local com HMR |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Preview do build |

## Variáveis de ambiente

Valores padrão estão em `src/config/site.ts`. No Docker, as mesmas chaves entram como *build args*.

| Variável | Função |
| --- | --- |
| `VITE_SITE_URL` | URL canônica do site |
| `VITE_WHATSAPP_NUMERO` | Número do WhatsApp (DDI + DDD + número) |
| `VITE_WHATSAPP_MENSAGEM` | Mensagem pré-preenchida do CTA |
| `VITE_AGENDAMENTO_URL` | URL de agendamento (opcional) |
| `VITE_GTM_ID` | Google Tag Manager (opcional) |
| `VITE_META_PIXEL_ID` | Meta Pixel (opcional) |

## Produção

O `Dockerfile` gera o build em Node 22 e serve `dist/` com Nginx na porta 80. O `docker-compose.yml` publica o container na rede `traefik-public`, com TLS via Let's Encrypt para `sucessoes.reboucasbulhoes.com`.

```bash
docker compose up -d --build
```

## Estrutura

```
src/
  pages/          Landing e política de privacidade
  components/     Seções, layout, ilustrações e UI
  content/        Textos das seções
  config/         URL, WhatsApp e avisos legais
```
