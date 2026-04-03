const { buildDriver } = require('../utils/driver');
const LoginPage = require('../pages/login.page');
const EmployeePage = require('../pages/employee.page');
const LoginFlow = require('../flows/login.flow');
const EmployeeFlow = require('../flows/employee.flow');
const { expect } = require('chai');

describe('Flujo OrangeHRM', function () {
    let driver;
    let loginFlow;
    let employeeFlow;

    this.timeout(60000);

    before(async () => {
        driver = await buildDriver();
        loginFlow = new LoginFlow(new LoginPage(driver));
        employeeFlow = new EmployeeFlow(new EmployeePage(driver));
    });

    after(async () => {
        if (driver) await driver.quit();
    });

    it('Flujo completo: login, crear, buscar y eliminar empleado', async () => {

        // Login incorrecto
        await loginFlow.loginIncorrecto();
        await driver.sleep(3000);
        const sourceLoginFail = await driver.getPageSource();
        expect(sourceLoginFail).to.include('Invalid credentials');

        // Login correcto
        await loginFlow.loginCorrecto();
        await driver.sleep(4000);
        const urlDashboard = await driver.getCurrentUrl();
        expect(urlDashboard).to.include('dashboard');

        // Crear empleado
        const nombre = 'JUAN' + Math.floor(Math.random() * 1000);
        await employeeFlow.crearEmpleado(nombre, 'Test');
        await driver.sleep(8000);
        const urlPim = await driver.getCurrentUrl();
        expect(urlPim).to.include('pim');

        // Buscar empleado
        await employeeFlow.buscarEmpleado(nombre);
        await driver.sleep(8000);
        const sourceBusqueda = await driver.getPageSource();
        expect(sourceBusqueda).to.include(nombre);

        // Eliminar empleado
        await employeeFlow.eliminarEmpleado(nombre);
        await driver.sleep(5000);

        // Verificar que fue eliminado
        await employeeFlow.buscarEmpleado(nombre);
        await driver.sleep(5000);
        const sourceEliminado = await driver.getPageSource();
        expect(sourceEliminado).to.not.include(nombre);

    });

});