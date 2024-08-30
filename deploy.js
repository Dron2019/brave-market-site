const fs = require('fs');
const { exec } = require('child_process');
const Confirm = require('prompt-confirm');
// or
const prompt = new Confirm({
    name: 'deploy', 
    message: 'Are you sure to deploy?(Y/N)'
});


prompt.ask(function(answer) {
    if (!answer) {
        console.log('Goodbye!');
        process.exit(0);
    }
    createVersionAndPushToGit();
});


function createVersionAndPushToGit() {

    // Шлях до файлу з версією
    const versionFilePath = 'version.txt';
    
    // Перевірка наявності файлу з версією
    if (!fs.existsSync(versionFilePath)) {
        console.error(`Файл ${versionFilePath} не знайдено!`);
        process.exit(1);
    }
    
    // Зчитування поточної версії
    let currentVersion = fs.readFileSync(versionFilePath, 'utf-8').trim();
    console.log(`Поточна версія: ${currentVersion}`);
    
    // Перевірка формату версії
    if (!/^[0-9]+(\.[0-9]+)?$/.test(currentVersion)) {
        console.error('Формат версії невірний! Переконайтеся, що версія у форматі X або X.Y.');
        process.exit(1);
    }
    
    // Розбиття версії на major і minor частини
    let [major, minor] = currentVersion.split('.').map(Number);
    
    // Якщо minor частини немає, ініціалізуємо її на 0
    if (isNaN(minor)) {
        minor = 0;
    }
    
    // Збільшення minor частини
    minor += 1;
    const newVersion = `${major}.${minor}`;
    console.log(`Нова версія: ${newVersion}`);
    
    // Запис нової версії у файл
    fs.writeFileSync(versionFilePath, newVersion, 'utf-8');
    
    // Створення тега
    const tagName = `deploy-v${newVersion}`;
    console.log(`Створюється тег: ${tagName}`);
    
    
    // Confirmation to run the code below
    
    exec(`git tag ${tagName}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Помилка при створенні тега: ${stderr}`);
            process.exit(1);
        }
    
        console.log(`Тег ${tagName} створено успішно.`);
    
        // Пуш тега на GitHub
        console.log('Пуш тега на GitHub');
        exec(`git push origin ${tagName}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Помилка при пуші тега: ${stderr}`);
                process.exit(1);
            }
    
            console.log(`Тег ${tagName} успішно відправлений на GitHub.`);
        });
    });
}

