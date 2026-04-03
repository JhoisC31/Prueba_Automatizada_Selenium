const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://opensource-demo.orangehrmlive.com/';

        this.usernameInput = By.name('username');
        this.passwordInput = By.name('password');
        this.loginButton = By.css('button[type="submit"]');
    }

    async open() {
        await this.driver.get(this.url);
    }

    async login(username, password) {
        await this.driver.wait(until.elementLocated(this.usernameInput), 5000);

        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }
}

module.exports = LoginPage;