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

## Produção (VPS)

O modelo é o mesmo da landing [rb-palestra-holding](https://github.com/matheusqueiroz92/rb-palestra-holding): o repositório no GitHub pode ter o prefixo `rb-`; na VPS as pastas são `/var/www/...` e `/opt/apps/...`.

| Onde | Caminho |
| --- | --- |
| Código (clone git) | `/var/www/rb-landing-patrimonio` |
| Compose + `.env` | `/opt/apps/rb-landing-patrimonio` |

O Nginx da imagem escuta na porta 80. O Traefik termina o HTTPS na rede `traefik-public`.

### Primeiro deploy

1. Crie o repositório no GitHub e faça push da branch `main`.
2. Na VPS, clone o código e copie o Compose:

```bash
git clone git@github.com:matheusqueiroz92/rb-landing-patrimonio.git /var/www/rb-landing-patrimonio
mkdir -p /opt/apps/rb-landing-patrimonio
cp /var/www/rb-landing-patrimonio/deploy/docker-compose.vps.yml /opt/apps/rb-landing-patrimonio/docker-compose.yml
cp /var/www/rb-landing-patrimonio/.env.example /opt/apps/rb-landing-patrimonio/.env
cd /opt/apps/rb-landing-patrimonio
docker compose up -d --build
```

O `.env` precisa de `APP_DOMAIN=sucessoes.reboucasbulhoes.com`.

### CI/CD (push em `main`)

O workflow em `.github/workflows/ci.yml` faz build no GitHub e, se passar, entra na VPS por SSH, atualiza o clone e reconstrói o container.

Secrets do repositório (Settings → Secrets and variables → Actions), iguais aos da palestra:

| Secret | Valor |
| --- | --- |
| `VPS_HOST` | `147.79.107.246` |
| `VPS_USER` | `root` |
| `VPS_SSH_KEY` | chave **privada** cujo par público está em `/root/.ssh/authorized_keys` na VPS |

Na VPS o deploy não usa `git pull` solto: faz `git fetch` + `git reset --hard origin/main`, para a pasta ficar idêntica ao GitHub.

## Estrutura

```
src/                 páginas, seções, ilustrações e conteúdo
deploy/              Compose usado só na VPS
.github/workflows/   CI/CD (build + SSH)
```
