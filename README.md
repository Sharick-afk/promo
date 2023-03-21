# Stack

- React
- Next
- Storybook
- Styled-component
- Typescript
- React-query
- ContextAPI
- yarn berry
- React-Hook-Form

# Git

Git Strategy:

- Используем [Squash Merge](https://www.git-tower.com/learn/git/faq/git-squash).

### HOW?

1. Создайте новую ветку для работы от последнего коммита из master ветки.
2. Спулить мастер в свою ветку.
3. Запушить работу в удаленный репозиторий в ту ветку, которую ранее создали.(commit log по своему)
4. Создать merge request в ветку dev(с описанием)
5. Code review(проверка)
6. После того, как все проверена, и смержено dev, проверить функционал на dev окружении.

### Commit

При squash and merge напишите коммит в соответствии с форматом ниже.

```
<commit type>/(WS-[номер задача]): <description>

<detail>

Reference
<Reference link>
```

- **commit type**: указать акт. (можно найти в таблице ниже.)
- **номер задача**:
  - номер задача youtrack.
- **description**: Описание коммита.
- **detail**: Подробное описание коммита.
- **task link**: Написать ссылку (youtrack) на задачу для коммита.

| Commit Type | Description                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| feature     | A new feature                                                                                               |
| fix         | A bug Fix                                                                                                   |
| docs        | Documentation only changes                                                                                  |
| style       | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| refactor    | A code change that neither fixes a bug nor adds a feature                                                   |
| perf        | A code change that improves performance                                                                     |
| test        | Adding missing tests or correcting existing tests                                                           |
| build       | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| ci          | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore       | Other changes that don't modify src or test files                                                           |
| revert      | Reverts a previous commit                                                                                   |
| content     | CMS product                                                                                                 |

**Example**:

```
feature/(WS-17): Добавлена возможность редактировать страницу управления партнером.

Features
- Добавлена страница редактирования информации о партнере..
- На главную страницу добавлена кнопка для перехода на страницу редактирования информации о партнере.

https://task.ovtech.xyz/agiles/108-54/current?issue=WS-22
```

# Notes on development

## Usage icon pack

1. Place the svg file `/public/assets/icons` to be added under
   1. In this case, file names are specified so that they can be separated by dash (`-`). This will convert it to underscore(`_`) when porting to enum values later.
2. Run `npm run make-icon-pack`.
3. Check whether the file added to the `src/components/Icon/icons.ts` is successfully created.
4. Check `<Icon />`.
5. Use it :)

## When local development (localhost)

- Установить docker for mac or window. (если не хочешь установить в mac устройстве docker, можно через brew установить docker-compose)
- Склонируй repository `https://lab.ovcenter.com/ws/docker`
- Прочитай документацию README.md в docker папке
- Нужно поставить переменые в api папке, `CLOUD_PAYMENTS_PUBLIC_ID=1` `CLOUD_PAYMENTS_API_KEY=1`
- Нужно копировать переменые из .env.dist `CORS_ALLOW_ORIGIN` в `.env`
- Генерируй `/docker make pull`
- Генерируй `/docker make up`, то docker-compose automatically run
- Генерируй `/docker make messenger`
- Если у тебя произоидет cache warmup Error нужно `docker exec ws_api bin/console cache:warmup`
- Когда backend поменял миграцию, либо добавил новую данную тебе нужно генерировать script в терминале `../docker make db_rebuild`
- Для Восстановление пароля нужно in api repository .env `SITE_URL={твой localhost}`
- Для запуска нужно еще создавать файл назвается `.sentryclirc` в root directory
  - в нем нужно token `[auth] token={токен}`. Token должно попрасить у **_@alexmorbo_**

## Price

- Backend отправляет денежные единицы в копейках если `currency RUB`. это значит нужно разделить 100

## Добавление package в package.json

- Когда добавляешь новый что-нибудь package, пожалуйста удаляйте `~` и `^` это для того чтобы `Dependency Pinning`.

## CI/CD

- Мы используем docker and kubernetes, кубер нам дает preview domain, для того чтобы заходить домену нужно VPN. спрасите у Саша.
- И при merge нужно удалить ветку

## CloudPayments Тестирование

| Тип                             | Номер карты         | Результат оплаты              | Результат оплаты по токену    |
| ------------------------------- | ------------------- | ----------------------------- | ----------------------------- |
| Карта Visa с 3-D Secure         | 4242 4242 4242 4242 | Успешный результат            | Успешный результат            |
| Карта Mastercard с 3-D Secure   | 5555 5555 5555 4444 | Успешный результат            | Успешный результат            |
| Карта Visa с 3-D Secure         | 4012 8888 8888 1881 | Недостаточно средств на карте | —                             |
| Карта Mastercard с 3-D Secure   | 5105 1051 0510 5100 | Недостаточно средств на карте | —                             |
| Карта Visa без 3-D Secure       | 4111 1111 1111 1111 | Успешный результат            | Недостаточно средств на карте |
| Карта Mastercard без 3-D Secure | 5200 8282 8282 8210 | Успешный результат            | Недостаточно средств на карте |
| Карта Visa без 3-D Secure       | 4000 0566 5566 5556 | Недостаточно средств на карте | —                             |
| Карта Mastercard без 3-D Secure | 5404 0000 0000 0043 | Недостаточно средств на карте | —                             |

## ЮKassa Тестирование

[ЮKassa](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing) link.

## Не Async api

- POST /api/cards/capture
- POST /api/premium/pay
- POST /api/subscriptions/{slug}/pay
- POST /api/subscriptions/{slug}/capture

### Reference

- DEV [Storybook](https://storybook.wlskl.xyz/) link.

### Comments

- When if reactStrictMode on, swiper won't work.
