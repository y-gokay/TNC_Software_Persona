# TNC Software Persona

Repo'da dört proje var. Hepsi ayrı klasörde.

```text
backend/          TeamTask REST API          Node.js + Express
veri_tabanı/      NovaStoreDB                SQL Server
web_geliştirme/   TeamTask Web               React + Vite
mobil_uygulama/   NovaStore Mini Katalog     Flutter
```

backend ve web aynı senaryo: takımın görevleri. SQL ve mobil aynı mağaza: NovaStore.

Web'in Netlify yayını ayrı depoda: [TNC_Netfily](https://github.com/y-gokay/TNC_Netfily). Netlify bu deponun kökünde `package.json` arıyor. TeamTask Web `web_geliştirme` altında olduğu için kökten build alamıyor. Aynı uygulama orada kökte duruyor.

Nasıl açılır, ne var, her klasörün kendi README'sinde. Ekran görüntüleri her projenin `docs/docs_assets` klasöründe. Postman, web ekranları ve emülatör orada.

```bash
cd backend
npm install
npm start
```

```text
http://localhost:3000
```

```bash
cd web_geliştirme
npm install
npm run dev
```

```text
http://localhost:5173
```

SQL: SSMS, `veri_tabanı/Gokay_NovaStore_Proje.sql`, F5.

Mobil:

```bash
cd mobil_uygulama/nova_store
flutter create . --project-name nova_store --platforms android,ios
flutter pub get
flutter run
```
