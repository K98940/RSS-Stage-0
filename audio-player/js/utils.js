/**
 * @param {number} max - максимальное возвращаемое значение (включительно)
 * @returns {number} Случайное число от 0 до max
 */
export function getRandomIndex(max) {
  return Math.floor(Math.random() * (max + 1));
} 
