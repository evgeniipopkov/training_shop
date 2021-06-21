
## api route

https://rarus-chlb.corp.rarus-cloud.ru/DemoTradeShop/hs/app

### Пользователь для использования методов http-сервиса

логин: hs 
пароль: hspass

### Авторизация для пользователя hs:hspass

```javascript
Authorization: 'Basic aHM6aHNwYXNz'
```

## Авторизация

POST .../login

headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic aHM6aHNwYXNz'
  }

body: 

```javascript
{
    "login": "SolnikovOP",
    "password": "147896325"
}
``` 

response:

```javascript
{
    "result": true,
    "message": ""
}
```  

## Получить список товаров

GET .../products

headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic aHM6aHNwYXNz'
  }

response:

```javascript
[
    {
        "name": "Eva Manchini / Платье",
        "price": 1864,
        "src": "https://github.com/evgeniipopkov/training_shop/blob/master/images/dress-1.jpg?raw=true",
        "balance": 121,
        "id": "358c46e4-bca3-11eb-9ef0-00e18ca39a16",
        "type": "Платье"
    },
]
``` 

## Получить товар

GET .../product

headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic aHM6aHNwYXNz'
  }

params: {id} // product id  

response:

```javascript
{
    "bigSrc": "https://github.com/evgeniipopkov/training_shop/blob/master/images/dress-1-big.jpg?raw=true",
    "views": null,
    "description": "Трикотажное базовое повседневное платье для офиса и для прогулок. Выполнено из качественного трикотажного мягкого полотна с эластаном, очень приятного к телу.",
    "name": "Eva Manchini / Платье",
    "price": 1864,
    "balance": 121,
    "id": "358c46e4-bca3-11eb-9ef0-00e18ca39a16"
}
``` 

## Получить список заказов

POST .../orders

headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic aHM6aHNwYXNz'
  }

body: 

```javascript
{
    "login": "SolnikovOP",
    "password": "147896325"
}
```

response:

```javascript
[
    {
        "number": "ТД00-000002",
        "date": "2021-05-25T00:00:00",
        "totalSum": 22562,
        "orderid": "110241a6-bd2c-11eb-80f1-0050569b8465",
        "status": "На согласовании, К выполнению / В резерве, К отгрузке, Закрыт",
        "products": [
            {
                "count": 6,
                "price": 1432,
                "sum": 8592,
                "productid": "358c46f4-bca3-11eb-9ef0-00e18ca39a16",
                "src": "https://github.com/evgeniipopkov/training_shop/blob/master/images/hoody-1.jpg?raw=true",
                "name": "A2 SPORT / Худи",
            },
        ]
    },
]    
```

## Создать заказ

POST .../order

headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic aHM6aHNwYXNz'
  }

body: 

```javascript
{
    "login": "SolnikovOP",
    "password": "147896325",
    "products":[
        {
            "id": "358c46e4-bca3-11eb-9ef0-00e18ca39a16",
            "count": 2,
            "price": 1864
        },
        {
            "id": "358c46e8-bca3-11eb-9ef0-00e18ca39a16",
            "count": 1,
            "price": 2328
        }
    ]
}
```

response:

```javascript
{
    "result": true,
    "message": ""
}
```

## Удалить заказ

DELETE .../order

headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic aHM6aHNwYXNz'
  }

params: {id} // order id  

response:

```javascript
{
    "result": true,
    "message": ""
}
```