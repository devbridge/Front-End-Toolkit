// Automated accessibility testing script
'use strict';

const pa11y = require('pa11y');
const htmlReporter = require('pa11y-reporter-html');
const puppeteer = require('puppeteer');
const fs = require('fs');

const reportsPath = 'reports/';

runExample();

function removeExistingReports() {

    var path = reportsPath;
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function writeReportToHTML(hostUrl, htmlText, fileName) {
    const failed = htmlText.indexOf('<span class="count error">0 errors</span>') < 0;

    if (!fs.existsSync(reportsPath)) {
        fs.mkdirSync(reportsPath);
    }

    fs.appendFile(reportsPath + fileName + '_results.html', htmlText, function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log('Tested on ' + hostUrl);
            console.log(failed ? '\x1b[1m\x1b[31mFAILED\x1b[0m' : 'OK');
            console.log(`Results added to ${reportsPath}${fileName}.html`);
        }
        console.log();
    });

    return failed;
}

// Async function required for us to use await
async function runExample() {
    let browser;
    let result = [];
    let pages = [];
    let report = [];
    const hostPort = process.argv[2] || 4200;
    const hostName = 'devbridge.com';
    const hostUrl = 'https://' + hostName;
    let hasErrors = false;

    try {
        browser = await puppeteer.launch();

        const testableUrls = [
            '/',
            '/approach/',
            '/contact-us/'
        ];

        for (let index = 0; index < testableUrls.length; index++) {
            const testUrl = hostUrl + testableUrls[index];

            pages[index] = await browser.newPage()

            result[index] = await pa11y(testUrl, {
                wait: 500,
                browser: browser,
                standard: 'WCAG2AA',
                method: 'GET',
                ignore: [
                    // Ignored because test cannot detect button type if it's not rendered in DOM.
                    'WCAG2A.Principle3.Guideline3_2.3_2_2.H32.2'
                ],
                headers: {
                    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    host: hostName
                },
                page: pages[index]
            });

            report = await htmlReporter.results(result[index], testUrl);
            hasErrors |= writeReportToHTML(testUrl, report, index);
        }
    } catch (error) {
        hasErrors = true;

        // Output an error if it occurred
        console.error(error.message);
    }
    finally {
        // Close the browser instance and pages if they exist
        if (pages) {
            for (const page of pages) {
                await page.close();
            }
        }
        if (browser) {
            await browser.close();
        }
    }

    if (hasErrors) {
        console.log('\x1b[1m\x1b[31mSome tests FAILED\x1b[0m');
        process.exit(1);
    } else {
        console.log('All PASSED');
    }
}
