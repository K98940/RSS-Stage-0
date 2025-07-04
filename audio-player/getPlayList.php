<?php
logToFile($_REQUEST, '_REQUEST');
// Включаем отображение ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Устанавливаем обработчик ошибок
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    $errorData = [
        'type' => $errno,
        'message' => $errstr,
        'file' => $errfile,
        'line' => $errline,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    logToFile($errorData, 'ОШИБКА ВЫПОЛНЕНИЯ');
    
    // Возвращаем false для продолжения обработки ошибок по умолчанию
    return false;
});

// Обработчик исключений
set_exception_handler(function($exception) {
    $errorData = [
        'type' => 'Exception',
        'message' => $exception->getMessage(),
        'file' => $exception->getFile(),
        'line' => $exception->getLine(),
        'trace' => $exception->getTraceAsString(),
        'timestamp' => date('Y-m-d H:i:s')
    ];
    logToFile($errorData, 'ИСКЛЮЧЕНИЕ');
    
    // Отправляем JSON с ошибкой
    http_response_code(500);
    echo json_encode(['error' => 'Внутренняя ошибка сервера'], JSON_UNESCAPED_UNICODE);
    exit;
});

header('Content-Type: application/json; charset=utf-8');

/**
 * Функция для логирования переменных в файл log.txt
 * @param mixed $data - данные для логирования
 * @param string $label - метка для идентификации записи
 * @param string $logFile - путь к файлу лога (по умолчанию log.txt)
 */
function logToFile($data, $label = '', $logFile = 'log.txt') {
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[{$timestamp}]";
    
    if (!empty($label)) {
        $logEntry .= " [{$label}]";
    }
    
    $logEntry .= ": ";
    
    if (is_array($data) || is_object($data)) {
        $logEntry .= json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } else {
        $logEntry .= var_export($data, true);
    }
    
    $logEntry .= "\n";
    
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// Константы
const URL_PREFFIX = '/player/assets/audio/';
const COVER_PREFFIX = '/player/assets/img/covers/';
const COLOR_BASE_COLOR = '180, 26%, 55%';
const BUTTON = [
    'url' => '/player/assets/icons/btn-play-dimash.png',
    'hue' => '240deg',
];

// Получаем список mp3 файлов (только первые 5)
$audioDir = __DIR__ . '/assets/audio/';

// Проверяем существование директории
if (!is_dir($audioDir)) {
    $errorData = [
        'message' => "Директория аудио файлов не найдена: {$audioDir}",
        'audioDir' => $audioDir,
        'currentDir' => __DIR__
    ];
    logToFile($errorData, 'ОШИБКА: Директория не найдена');
    
    // Возвращаем пустой плейлист с ошибкой
    echo json_encode([
        'error' => 'Директория аудио файлов не найдена',
        'playlist' => []
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Проверяем права доступа к директории
if (!is_readable($audioDir)) {
    $errorData = [
        'message' => "Нет прав на чтение директории: {$audioDir}",
        'audioDir' => $audioDir
    ];
    logToFile($errorData, 'ОШИБКА: Нет прав доступа');
    
    echo json_encode([
        'error' => 'Нет прав доступа к директории аудио файлов',
        'playlist' => []
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Сканируем директорию с обработкой ошибок
$scannedFiles = @scandir($audioDir);
if ($scannedFiles === false) {
    $errorData = [
        'message' => "Ошибка при сканировании директории: {$audioDir}",
        'audioDir' => $audioDir,
        'error' => error_get_last()
    ];
    logToFile($errorData, 'ОШИБКА: Сканирование директории');
    
    echo json_encode([
        'error' => 'Ошибка при сканировании директории аудио файлов',
        'playlist' => []
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$files = array_values(array_filter($scannedFiles, function($file) use ($audioDir) {
    return is_file($audioDir . $file) && preg_match('/\.mp3$/i', $file);
}));
// $files = array_slice($files, 0, 5);

// Логируем найденные файлы
logToFile($files, 'Найденные MP3 файлы');

$playList = [];
$errors = [];

foreach ($files as $i => $file) {
    try {
        // Проверяем существование файла
        $fullPath = $audioDir . $file;
        if (!file_exists($fullPath)) {
            $errorData = [
                'message' => "Файл не найден: {$file}",
                'fullPath' => $fullPath,
                'index' => $i
            ];
            logToFile($errorData, 'ПРЕДУПРЕЖДЕНИЕ: Файл не найден');
            $errors[] = "Файл {$file} не найден";
            continue;
        }
        
        // Проверяем права доступа к файлу
        if (!is_readable($fullPath)) {
            $errorData = [
                'message' => "Нет прав на чтение файла: {$file}",
                'fullPath' => $fullPath,
                'index' => $i
            ];
            logToFile($errorData, 'ПРЕДУПРЕЖДЕНИЕ: Нет прав доступа к файлу');
            $errors[] = "Нет прав доступа к файлу {$file}";
            continue;
        }
        
        $playList[] = [
            'id' => $i,
            'url' => URL_PREFFIX . $file,
            'name' => $file,
            'cover' => COVER_PREFFIX . rand(0, 5),
            'colorBaseColor' => COLOR_BASE_COLOR,
            'button' => BUTTON,
        ];
        
    } catch (Exception $e) {
        $errorData = [
            'message' => "Ошибка при обработке файла: {$file}",
            'exception' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'index' => $i
        ];
        logToFile($errorData, 'ОШИБКА: Обработка файла');
        $errors[] = "Ошибка при обработке файла {$file}: " . $e->getMessage();
    }
}

// Логируем ошибки, если они есть
if (!empty($errors)) {
    logToFile($errors, 'ОШИБКИ ОБРАБОТКИ ФАЙЛОВ');
}

// Логируем финальный плейлист
logToFile($playList, 'Финальный плейлист');

// Формируем ответ
$response = [
    'playlist' => $playList,
    'total_files' => count($files),
    'processed_files' => count($playList),
    'errors' => $errors
];

// Проверяем, есть ли ошибки для логирования
if (!empty($errors)) {
    logToFile($response, 'ОТВЕТ С ОШИБКАМИ');
} else {
    logToFile($response, 'УСПЕШНЫЙ ОТВЕТ');
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); 
