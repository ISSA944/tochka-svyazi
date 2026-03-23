# Точка Связи

## Локальный запуск

`npm install`

`npm run dev`

## Проверки

`npm run lint`

`npm exec tsc -- --noEmit`

`npm run test`

`npm run test:e2e`

## GitHub Pages

В репозитории добавлен workflow `.github/workflows/deploy.yml`.

Для production-сборки под GitHub Pages используется `VITE_BASE_PATH`, а роутер автоматически подхватывает `import.meta.env.BASE_URL`, поэтому сайт корректно открывается из подкаталога репозитория.
