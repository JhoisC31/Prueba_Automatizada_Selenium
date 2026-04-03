const { buildDriver } = require('../utils/driver');
const LoginPage = require('../pages/login.page');
const EmployeePage = require('../pages/employee.page');
const LoginFlow = require('../flows/login.flow');
const EmployeeFlow = require('../flows/employee.flow');
const { expect } = require('chai');

describe('Flujo OrangeHRM', function () {
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


    //Flujo Completo
    it('Flujo', async () => {

        // Login credenciales no correctas
        await loginFlow.loginIncorrecto();
        await driver.sleep(3000);

        let pageSource = await driver.getPageSource();
        expect(pageSource).to.include('Invalid credentials');

        // Login credenciales correctas
        await loginFlow.loginCorrecto();
        await driver.sleep(4000);

        let url = await driver.getCurrentUrl();
        expect(url).to.include('dashboard');




        //formulario crear empleado
        const nombre = 'HERNESTO' + Math.floor(Math.random() * 1000);

        await employeeFlow.crearEmpleado(nombre, 'Test');
        await driver.sleep(4000);

        url = await driver.getCurrentUrl();
        expect(url).to.include('pim');


        //busqueda
        await employeeFlow.buscarEmpleado(nombre);
        await driver.sleep(3000);

        let pagesource = await driver.getPageSource();
        expect(pagesource).to.include(nombre);
    });
});