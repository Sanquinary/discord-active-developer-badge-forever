// src/utils/inputValidation.js
const cronParser = require('cron-parser');

// Function to validate the bot token
const validateBotToken = (input) => {
    const tokenParts = input.split('.');

    if (tokenParts.length !== 3) {
        return 'Please enter a valid bot token.';
    }

    const partLengths = tokenParts.map(part => part.length);
    if (
        partLengths[0] < 5 || partLengths[1] < 5 || partLengths[2] < 5 || 
        partLengths[0] > 64 || partLengths[1] > 64 || partLengths[2] > 64
    ) {
        return 'Please enter a valid bot token.';
    }

    return true;
};

// Function to validate numeric input
const validateNumericInput = (input) => {
    return /^\d+$/.test(input) ? true : 'Please enter a valid numeric value.';
};

// Function to validate the schedule input
const validateCronInput = (input) => {
    try {
        cronParser.parseExpression(input);
        return true;
    } catch (e) {
        return 'Please enter a valid cron expression or use a valid preset like "daily", "weekly", "monthly".';
    }
};

// Convert to cron expression
const convertToCron = (input) => {
    const lowerInput = input.toLowerCase();
    switch (lowerInput) {
        case 'daily':
            return '0 0 * * *'; // every day at midnight
        case 'weekly':
            return '0 0 * * 0'; // every Sunday at midnight
        case 'monthly':
            return '0 0 1 * *'; // first day of every month at midnight
        default:
            return validateCronInput(input) === true ? input : null;
    }
};

module.exports = { validateBotToken, validateNumericInput, validateCronInput, convertToCron };