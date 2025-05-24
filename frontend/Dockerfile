FROM node:18

# CLI telepítése globálisan
RUN npm install -g @angular/cli

# Projektmappa létrehozása
WORKDIR /app

# Csak a package fájlokat másoljuk először a gyorsabb cache miatt
COPY package*.json .

# Függőségek telepítése
RUN npm install

# Forráskód bemásolása
COPY . .

# Angular dev szerver elérhetővé tétele
EXPOSE 4200

# Angular alkalmazás indítása
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]

