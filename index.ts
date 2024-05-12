#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

interface CurrencyRates {
    [key: string]: number;
}

const currencyRates: CurrencyRates = {
    USD: 1,
    PKR: 279,
    EUR: 0.97,
    AUD: 1.51,
    INR: 139,
};

const convertCurrency = (fromCurrency: string, toCurrency: string, amount: number): number => {
    const fromRate = currencyRates[fromCurrency];
    const toRate = currencyRates[toCurrency];
    if (!fromRate || !toRate) {
        console.log(chalk.red('Invalid currency.'));
    }
    const convertedAmount = (amount / fromRate) * toRate;
    return convertedAmount;
};

async function currencyConverter() {
    const answers: any = await inquirer.prompt([
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Select the currency you are converting from:',
            choices: Object.keys(currencyRates),
        },
        {
            type: 'list',
            name: 'toCurrency',
            message: 'Select the currency you are converting to:',
            choices: Object.keys(currencyRates),
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount to convert:',
            validate: function (value) {
                const valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        },
    ]);

    const { fromCurrency, toCurrency, amount } = answers;
    const convertedAmount = convertCurrency(fromCurrency, toCurrency, amount);
    console.log(chalk.green(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}.`));
}

currencyConverter();
