# 🪙 BTC Price Mock API

Простий Node.js-сервер, який генерує фейкові дані про зміну ціни Bitcoin для використання у графіках або тестах API. Підтримує параметри часу, інтервалу та кількості точок.

## 🌐 Live Demo

Демо версія розгорнута на Railway:

🔗 [Live Demo](https://btc-server-production.up.railway.app/price/btc?id=1&time_start=1749384292&interval=5m&count=288)

## 📦 Repository

- 📁 [GitHub Repo](https://github.com/dvdmsk/btc-server) 


## ✨ Features

- Генерація фіктивних даних ціни BTC у реальному часі
- Параметризовані запити (id, time_start, interval, count)
- Сумісність з більшістю графічних бібліотек
- Простий у використанні та налаштуванні

## 🚀 Getting Started

Щоб запустити проект локально:

1. **Клонуйте репозиторій**

    ```bash
    git clone https://github.com/dvdmsk/btc-server.git
    cd your-repo-name
    ```

2. **Запустіть сервер**

    ```bash
    node index.js
    ```

3. **Зробіть запит до API**

    Відкрийте у браузері або за допомогою curl:
    
    ```http
    GET http://localhost:3000/price/btc?id=1&time_start=1749384292&interval=5m&count=288
    ```
    
    **Параметри:**
    - `id` — ідентифікатор активу (1 для BTC)
    - `time_start` — початковий час у форматі UNIX (секунди)
    - `interval` — інтервал між точками (1m, 5m, 15m, 1h)
    - `count` — кількість точок даних

## 🌐 Deployment

Проєкт задеплойлено на Railway. Ви можете використовувати наступний URL для доступу:

```http
GET https://btc-server-production.up.railway.app/price/btc
```

Приклад робочого запиту:


```http
https://btc-server-production.up.railway.app/price/btc?id=1&time_start=1749384292&interval=5m&count=288
```
