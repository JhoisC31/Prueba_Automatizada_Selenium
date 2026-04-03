class LoginFlow {
    constructor(loginPage) {
        this.loginPage = loginPage;
    }

    async loginCorrecto() {
        await this.loginPage.open();
        await this.loginPage.login('Admin', 'admin123');
    }

    async loginIncorrecto() {
        await this.loginPage.open();
        await this.loginPage.login('Admin', 'incorrecto');
    }
}

module.exports = LoginFlow;