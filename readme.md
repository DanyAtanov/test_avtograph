# АВТОграф Тестовое задание

## Установка

-   [NodeJS](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/)

### Установка зависимостей

```bash
cd projectname
yarn
```

### Дев и прод сборка проекта

Команда `yarn dev` запускает сборку для разработки.

Сайт собирается в папку `theme` и доступен по URL:

```
http://localhost:8000
```

Команда `yarn prod` запускает продакшн сборку сайта.

### SVG спрайт

Команда `yarn sprite` собирает svg из папки `src/assets/images/svg/` в спрайт `theme/assets/images/sprite.svg`

Чтобы обратиться к нужной иконке из спрайта необходимо прописать `id` иконки, например `#icon_name`, который соответствует имени файла в папке `sprite`.

    <svg>
    	<use xlink:href="#icon_name"></use>
    </svg>

### Форматирование кода

Команда `yarn pretty` форматирует html, scss и js файлы исходников
