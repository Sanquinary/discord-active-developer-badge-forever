const fs = require('fs');

const scheduleFile = 'config/schedule.json';

function saveNextExecutionTime(nextExecutionTime) {
    fs.writeFileSync(scheduleFile, JSON.stringify({ nextExecutionTime }));
}

function loadNextExecutionTime() {
    if (fs.existsSync(scheduleFile)) {
        const data = JSON.parse(fs.readFileSync(scheduleFile, 'utf8'));
        return new Date(data.nextExecutionTime);
    }
    return null;
}

module.exports = { saveNextExecutionTime, loadNextExecutionTime };