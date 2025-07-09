# Etapa base: usa Node oficial
FROM node:22

# Cria diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json / pnpm-lock.yaml
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta (ajuste conforme seu server)
EXPOSE 3333

# Comando default: roda o servidor com ts-node
CMD ["npm", "run", "start"]
