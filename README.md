🧪 Tesztmenedzsment Alkalmazás – Indítási Útmutató
Ez a projekt egy webalapú tesztmenedzsment rendszer, amely lehetővé teszi tesztesetek kezelését, végrehajtását és riportolását.

📦 Backend (Node.js + Express + SQLite)
1. Lépj be a backend mappába
bash
Copy
Edit
cd project-root/backend
2. Telepítsd a csomagokat
bash
Copy
Edit
npm install
3. Inicializáld az adatbázist (ha szükséges)
Futtasd az init.sql scriptet, vagy engedd, hogy az app automatikusan létrehozza a DB fájlt (ha sqlite3 használatban van).

4. Indítsd el a szervert
bash
Copy
Edit
npm start
A szerver elérhető lesz a http://localhost:3001 címen.

🌐 Frontend (Angular)
1. Lépj be a frontend mappába
bash
Copy
Edit
cd project-root/frontend
2. Angular projekt generálása (ha még nem történt meg)
bash
Copy
Edit
ng new frontend --directory=.
3. Telepítsd a csomagokat
bash
Copy
Edit
npm install
4. Indítsd el az Angular alkalmazást
bash
Copy
Edit
ng serve
Az alkalmazás elérhető lesz a http://localhost:4200 címen.
