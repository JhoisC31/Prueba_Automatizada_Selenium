const { buildDriver } = require('../utils/driver');
const LoginPage = require('../pages/login.page');
const EmployeePage = require('../pages/employee.page');
const LoginFlow = require('../flows/login.flow');
const EmployeeFlow = require('../flows/employee.flow');
const { expect } = require('chai');

describe('Flujo completo OrangeHRM', function () {
    let driver;
    let loginPage;
    let employeePage;
    let loginFlow;
    let employeeFlow;

    this.timeout(40000);

    before(async () => {
        driver = await buildDriver();

        loginPage = new LoginPage(driver);
        employeePage = new EmployeePage(driver);

        loginFlow = new LoginFlow(loginPage);
        employeeFlow = new EmployeeFlow(employeePage);
    });

    after(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    it('Flujo completo: negativo → positivo → crear empleado', async () => {

        // Credenciales no correctas
        await loginFlow.loginIncorrecto();
        await driver.sleep(3000);

        let pageSource = await driver.getPageSource();
        expect(pageSource).to.include('Invalid credentials');

        // Credenciales correctas
        await loginFlow.loginCorrecto();
        await driver.sleep(3000);

        let url = await driver.getCurrentUrl();
        expect(url).to.include('dashboard');






        // 👨‍💼 CREAR EMPLEADO
        const nombre = 'Juan' + Math.floor(Math.random() * 1000);

        await employeeFlow.crearEmpleado(nombre, 'Test');
        await driver.sleep(3000);

        url = await driver.getCurrentUrl();
        expect(url).to.include('pim');
    });
});