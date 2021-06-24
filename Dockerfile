FROM node:latest as angular
WORKDIR /app
COPY ["package.json", "/app"]
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx
VOLUME [ "/var/cache/nginx" ]
COPY --from=angular app/dist/requests-http /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf



# docker build -t curso-angular .   #gera a imagem
# docker run -p 8081:80 curso-angular    #testa para ver se a imagem está funcionando - mapeia a porta 8081 (do meu localhost - é uma porta alatoria) para a porta 80 (padrão do docker) para rodar esse aplicativo dentro do Dockerfile