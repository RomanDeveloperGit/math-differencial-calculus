const getArea = (func, a, b, intervalStep = 0.001) => {
  if (
    typeof func !== "function" ||
    typeof a !== "number" ||
    typeof b !== "number"
  )
    throw new Error(
      "Expected: func - math function, e.g (x: number) => x ** 2; a, b - interval [a: number, b: number]"
    );

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

  return (intervalsOrder * sumSquares).toFixed(3);
};
