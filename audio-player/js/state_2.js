import { stateHandler } from './stateHandler.js';
import { URL_PREFFIX, COVER_PREFFIX } from './constants.js';

// Функция для получения плейлиста с сервера
async function fetchPlayList() {
  try {
    const response = await fetch('./getPlayList.php');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Проверяем, есть ли ошибки в ответе
    if (data.error) {
      console.error('Ошибка сервера:', data.error);
      return [];
    }

    // Возвращаем плейлист из ответа сервера
    return data.playlist || data;
  } catch (error) {
    console.error('Ошибка при загрузке плейлиста:', error);
    return [];
  }
}

// Инициализируем пустой плейлист
export let playList = [];

// Функция для инициализации плейлиста
export async function initializePlayList() {
  playList = await fetchPlayList();

  // Если плейлист пустой, используем резервный
  if (playList.length === 0) {
    console.warn('Не удалось загрузить плейлист с сервера, используется резервный');
    playList = [
      {
        id: 0,
        url: `${URL_PREFFIX}Vangelis - Prelude-audio.mp3`,
        name: 'Vangelis - Prelude',
        cover: `${COVER_PREFFIX}3`,
        colorBaseColor: '240, 8%, 51%',
        button: {
          url: '../assets/icons/btn-play-vangelis.png',
          hue: '280deg',
        },
      },
    ];
  }

  // Случайная сортировка перед выводом
  playList = shufflePlayList(playList);
  return playList;
}

// Инициализируем состояние с первым треком (будет обновлено после загрузки)
const stateObj = {
  audio: {
    isPlay: false,
    currentTime: 0,
    volume: 0.5,
    currentTrack: null, // Будет установлен после загрузки плейлиста
  },
};

export const state = new Proxy(stateObj, stateHandler);

/**
 * Функция для случайной сортировки массива (алгоритм Fisher-Yates)
 * @param {Array} list - массив для перемешивания
 * @returns {Array} - перемешанный массив
 * 
 * Алгоритм Fisher-Yates обеспечивает:
 * - Равномерное распределение всех перестановок
 * - Сложность O(n) вместо O(n log n)
 * - Стабильные и непредсказуемые результаты
 */
function shufflePlayList(list) {
  // Создаем копию массива, чтобы не изменять оригинал
  const shuffled = list.slice();
  
  // Алгоритм Fisher-Yates (в обратном порядке)
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Генерируем случайный индекс от 0 до i включительно
    const j = Math.floor(Math.random() * (i + 1));
    
    // Меняем местами элементы
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}
