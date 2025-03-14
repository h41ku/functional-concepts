# functional-concepts

Библиотека с набором функций для возможности использования некоторых приемов функционального программирования.

В состав входят следующие функции:

- `compose`
- `curry`
- `flip`
- `is`
- `memoize`
- `partial`
- `pipe`
- `concat`
- `each`
- `filter`
- `find`
- `findIndex`
- `last`
- `map`
- `reduce`
- `reduceRight`
- `reverse`
- `sort`
- `unique`
- `zip`

А также их каррированные варианты.

## Установка

NPM:

```sh
npm install functional-concepts
```

## Использование

```js
// классические варианты функций
import { /* имена функций */ } from 'functional-concepts'

// каррированные варианты функций
import { /* имена функций */ } from 'functional-concepts/curried'
```

## Примеры использования

В дальнейших примерах будем оперировать массивом объектов описывающих машины. Каждая машина представлена объектом следующего вида:

```js
{
    name: 'Aston Martin One-77',
    horsePower: 750,
    maxSpeed: 220,
    price: 1850000,
    inStock: true
}
```

### Каррирование

Функция `curry(f, arity = f.length)` преобразует функцию в набор функций с единственным аргументом.

Рассмотрим вариант функции без каррирования:

```js
// функция с двумя аргументами
const map = (f, array) => array.map(f)
// деталь
const getPrices = cars => map(car => car.price, cars) // не очень удобно создавать детали - над именами аргументов приходится подумать
```

Применим каррирование:

```js
// каррированная функция
const map = curry((f, array) => array.map(f))
// деталь
const getPrices = map(car => car.price) // уже лучше
```

Можем использовать бесточечный стиль (point-free style):

```js
// вспомогательная функция
const prop = curry((name, obj) => obj[name]) // можно переиспользовать
// селектор
const selectPrice = prop('price') // можно переиспользовать
// деталь
const getPrices = map(selectPrice) // бесточечный стиль, выглядит кратко и лаконично
```

Пример использования:

```js
console.log(getPrices(getCars()))
```

Несмотря на то, что в классическом понимании каррирование преобразует функцию в набор функций с единственным параметром, на практике реализации каррирования могут принимать несколько аргументов за раз:

```js
const sum = (x, y, z) => x + y + z
const curriedSum = curry(sum)
curriedSum(8, 13)(21) // 42
curriedSum(8)(13, 21) // 42
curriedSum(8, 13, 21) // 42
```

### Частичное применение

Функция `partial(f, ...args)` преобразует функцию с некоторым числом аргументов в функцию с меньшим числом аргументов.

```js
// функции с двумя аргументами
const map = (f, array) => array.map(f)
const prop = (name, obj) => obj[name]

// частичное применение
const selectPrice = partial(prop, 'price')
const getPrices = partial(map, selectPrice)

console.log(getPrices(getCars())) // пример использования
```

В отличии от каррированной функции, в функцию с частичным применением нужно передать все недостающие параметры:

```js
const sum = (x, y, z) => x + y + z
const partialSum = partial(sum, 8)
partialSum(13, 21) // 42 т.к. выполнится sum(8, 13, 21)
partialSum(13) // NaN т.к. выполнится sum(8, 13, undefined)
```

### Композиция

Функция `compose(...fs)` возвращает функцию, аргумент которой последовательно проходит справа налево:

Определим функции с которыми будем работать в примере:

```js
const add = (x, y) => x + y
const map = (f, array) => array.map(f)
const reduce = (f, array) => array.reduce(f)

// вспомогательная функция, вычисляющая среднее арифметическое из значений в массиве
const average = xs => reduce(add, xs) / xs.length
```

Без композиции деталь была бы такой:

```js
// деталь
const getAveragePrice = cars => average(map(car => car.price, cars))
```

Используем композицию:

```js
// деталь
const getAveragePrice = compose(average, map(car => car.price)) // уже лучше
```

В бесточечном стиле:

```js
// вспомогательная функция
const prop = name => obj => obj[name] // можно переиспользовать
// селектор
const selectPrice = prop('price') // можно переиспользовать
// деталь в бесточечном стиле
const getAveragePrice = compose(average, map(selectPrice)) // еще лучше
```

Пример использования:

```js
console.log(getAveragePrice(getCars()))
```

### Конвейер

Функция `pipe(...fs)` возвращает функцию аргумент которой, последовательно проходит слева направо:

```js
const sort = xs => [...xs].sort()
const last = xs => xs[xs.length - 1]
const selectMaxSpeed = prop('maxSpeed')

// деталь
const getFastestCar = pipe(map(selectMaxSpeed), sort, last) // конвейер

console.log(getFastestCar(getCars())) // пример использования
```

Порядок выполнения функций в конвейере отличается от порядка выполнения функций в композиции:

```js
// оригинальная цепочка вызовов
three(two(one(x)))

// более естественно с точки зрения чтения
pipe(one, two, three)(x)

// более естественно с точки зрения записи
compose(three, two, one)(x)
```

### Мемоизация

Это полезный приём, при котором функция кеширует результаты своего вызова, чтобы не выполнять повторяющиеся вычисления.
Функция `memoize(f, cache = new Map)` возвращает функцию кеширующую результаты выполнения оригинальной функции.

Пример без мемоизации:

```js
const f = x => x * x
f(2) // вычислить
f(2) // вычислить
f(2) // вычислить
```

С мемоизацией:

```js
const f = memoize(x => x * x)
f(2) // вычислить
f(2) // взять из кеша
f(2) // взять из кеша
```

### Проверка типа

Функция `is(type, x)` - это предикат, проверяющий принадлежность своего аргумента `x` к определенному классу `type`.

```js
const elements = [...document.body.children].filter(is(Element))
```

### Изменение порядка аргументов

Функция `flip(f)` меняет порядок аргументов. Иногда это бывает полезно.

```js
const pipe = flip(compose)
```

## Тестирование при разработке

```sh
npm test
```

## Лицензия

MIT
