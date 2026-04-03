const { buildDriver } = require('../utils/driver');
const LoginPage = require('../pages/login.page');
const LoginFlow = require('../flows/login.flow');
const { expect } = require('chai');

describe('Login OrangeHRM', function () {
    let driver;
    let loginPage;
    let loginFlow;

    this.timeout(30000);

    before(async () => {
        driver = await buildDriver();
        loginPage = new LoginPage(driver);
        loginFlow = new LoginFlow(loginPage);
    });

    after(async () => {
        if (driver) {
            await driver.quit();
        }
    });


    // Flojo Negativo
    it('CP1 - Login inválido', async () => {
        await loginFlow.loginIncorrecto();

        await driver.sleep(3000);

        const pageSource = await driver.getPageSource();
        expect(pageSource).to.include('Invalid credentials');
    });



    //Flujo Positivo
    it('Login exitoso', async () => {
        await loginFlow.loginCorrecto();

        await driver.sleep(3000);

        const url = await driver.getCurrentUrl();
        expect(url).to.include('dashboard');
    });
});