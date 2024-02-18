// Основной алгоритм Римановского интеграла - дробим ось X на предельно маленькие промежутки, ...
// ...считаем площади прямоугольников, их сумма = интегральная сумма.
const calculateArea = (func, a, b, intervalStep = 0.001) => {
  if (
    typeof func !== "function" ||
    typeof a !== "number" ||
    typeof b !== "number"
  ) {
    throw new Error(
      "Expected: func - math function, e.g (x: number) => x ** 2; a, b - interval [a: number, b: number]"
    );
  }

  let intervalsOrder = b > a ? 1 : -1;
  let sumSquares = 0;

  if (b < a) {
    const temp = b;

    b = a;
    a = temp;
  }

  for (let i = a; i < b; i += intervalStep) {
    sumSquares += intervalStep * ((func(i) + func(i + intervalStep)) / 2);
  }

  return (intervalsOrder * sumSquares).toFixed(5);
};

// Обертка для основной функции, просто есть возможность считать интеграл с разными шагами
// Чем меньше шаг, тем менее точный результат
const calculateAreaWithDifferentIntervalSteps = (intervalSteps) => {
  if (!Array.isArray(intervalSteps)) {
    throw "Expected array intervalSteps of numbers";
  }

  return (...args) => {
    return intervalSteps.reduce(
      (result, intervalStep) => ({
        ...result,
        [`Шаг ${intervalStep}`]: calculateArea(...args, intervalStep),
      }),
      {}
    );
  };
};
