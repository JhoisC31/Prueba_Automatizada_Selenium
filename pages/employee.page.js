const { By, until } = require('selenium-webdriver');

class EmployeePage {
    constructor(driver) {
        this.driver = driver;

        //menu
        this.pimMenu = By.xpath("//span[text()='PIM']");
        this.addButton = By.xpath("//button[.=' Add ']");

        //formulario
        this.firstName = By.name('firstName');
        this.lastName = By.name('lastName');
        this.saveButton = By.xpath("//button[@type='submit']");


        //busqueda
        this.employeeNameSearch = By.xpath("//input[@placeholder='Type for hints...']");
        this.searchButton = By.xpath("//button[.=' Search ']");
        this.resultName = By.xpath("//div[@class='oxd-table-body']");
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

   async buscarEmpleado(nombre) {
    await this.driver.wait(until.elementLocated(this.employeeNameSearch), 5000);

    const input = await this.driver.findElement(this.employeeNameSearch);

    await this.driver.wait(until.elementIsVisible(input), 5000);
    await this.driver.wait(until.elementIsEnabled(input), 5000);

    await input.clear();
    await input.sendKeys(nombre);

    const boton = await this.driver.findElement(this.searchButton);
    await this.driver.wait(until.elementIsVisible(boton), 5000);

    await boton.click();
}
}

module.exports = EmployeePage;