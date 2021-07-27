export function parse(inputValue = '') {
  const value = typeof value === 'string' ? inputValue : inputValue.toString();
  if (value.startsWith('=')) {
    try {
      return getValidExpression(value);
    } catch (e) {
      console.warn('skipping parse error', e.message );
    }
  }
  return value;
}

function getValidExpression(expression) {
  if (expression.match(/[0-9]$/)) {
    return eval(expression.slice(1));
  } else if ( expression === '') {
    return null;
  }
  return getValidExpression(expression.slice(0, -1));
}
