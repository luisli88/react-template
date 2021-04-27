const generateColorFunction = (cssVariable) => ({ opacityValue, opacityVariable }) => {
  if (opacityValue !== undefined) {
    return `rgba(var(${cssVariable}), ${opacityValue})`
  }
  if (opacityVariable !== undefined) {
    return `rgba(var(${cssVariable}), var(${opacityVariable}, 1))`
  }
  return `rgb(var(${cssVariable}))`
}

module.exports = {
  generateColorFunction,
}
