const { By, until } = require('selenium-webdriver');

class EmployeePage {
    constructor(driver) {
        this.driver = driver;

        // Menú
        this.pimMenu = By.xpath("//span[text()='PIM']");
        this.addButton = By.xpath("//button[.=' Add ']");

        // Formulario crear
        this.firstName = By.name('firstName');
        this.lastName = By.name('lastName');
        this.saveButton = By.xpath("//button[@type='submit']");

        // Búsqueda
        this.employeeNameSearch = By.xpath("//input[@placeholder='Type for hints...']");
        this.searchButton = By.xpath("//button[.=' Search ']");

        // Editar / Eliminar
        this.editButtonFirstRow = By.xpath("(//div[@class='oxd-table-body']//div[@role='row'][1]//button)[1]");
        this.deleteButtonFirstRow = By.xpath("(//div[@class='oxd-table-body']//div[@role='row'][1]//button)[2]");
        this.confirmDeleteButton = By.xpath("//button[contains(., 'Yes, Delete')]");
    }

    async goToPIM() {
        await this.driver.wait(until.elementLocated(this.pimMenu), 7000);
        await this.driver.findElement(this.pimMenu).click();
    }

    async clickAddEmployee() {
        await this.driver.wait(until.elementLocated(this.addButton), 7000);
        await this.driver.findElement(this.addButton).click();
    }

    async fillEmployee(first, last) {
        await this.driver.wait(until.elementLocated(this.firstName), 7000);
        await this.driver.findElement(this.firstName).sendKeys(first);
        await this.driver.findElement(this.lastName).sendKeys(last);
    }

    async saveEmployee() {
        await this.driver.wait(until.elementLocated(By.css('.oxd-form-loader')), 3000).catch(() => {});
        await this.driver.wait(
            async () => {
                const loaders = await this.driver.findElements(By.css('.oxd-form-loader'));
                return loaders.length === 0;
            },
            10000,
            'El loader no desapareció a tiempo'
        );

        const btn = await this.driver.findElement(this.saveButton);
        await this.driver.wait(until.elementIsVisible(btn), 5000);
        await this.driver.wait(until.elementIsEnabled(btn), 5000);
        await btn.click();
    }

    async buscarEmpleado(nombre) {
        const input = await this.driver.wait(until.elementLocated(this.employeeNameSearch), 7000);
        await this.driver.wait(until.elementIsVisible(input), 5000);
        await this.driver.wait(until.elementIsEnabled(input), 5000);
        await input.clear();
        await input.sendKeys(nombre);

        const boton = await this.driver.findElement(this.searchButton);
        await this.driver.wait(until.elementIsVisible(boton), 5000);
        await boton.click();
    }

    async eliminarPrimerEmpleado() {
        const deleteBtn = await this.driver.wait(until.elementLocated(this.deleteButtonFirstRow), 7000);
        await this.driver.wait(until.elementIsVisible(deleteBtn), 5000);
        await deleteBtn.click();

        const confirmBtn = await this.driver.wait(until.elementLocated(this.confirmDeleteButton), 5000);
        await this.driver.wait(until.elementIsVisible(confirmBtn), 5000);
        await confirmBtn.click();
    }
}

module.exports = EmployeePage;