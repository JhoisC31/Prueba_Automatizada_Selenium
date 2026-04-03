const { By, until } = require('selenium-webdriver');

class EmployeePage {
    constructor(driver) {
        this.driver = driver;

        // Menú
        this.pimMenu = By.xpath("//span[text()='PIM']");
        this.addButton = By.xpath("//button[.=' Add ']");

        // Formulario
        this.firstName = By.name('firstName');
        this.lastName = By.name('lastName');
        this.saveButton = By.xpath("//button[@type='submit']");
    }

    async goToPIM() {
        await this.driver.wait(until.elementLocated(this.pimMenu), 5000);
        await this.driver.findElement(this.pimMenu).click();
    }

    async clickAddEmployee() {
        await this.driver.wait(until.elementLocated(this.addButton), 5000);
        await this.driver.findElement(this.addButton).click();
    }

    async fillEmployee(first, last) {
        await this.driver.wait(until.elementLocated(this.firstName), 5000);

        await this.driver.findElement(this.firstName).sendKeys(first);
        await this.driver.findElement(this.lastName).sendKeys(last);
    }

    async saveEmployee() {
        await this.driver.findElement(this.saveButton).click();
    }
}

module.exports = EmployeePage;