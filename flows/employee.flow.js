class EmployeeFlow {
    constructor(employeePage) {
        this.employeePage = employeePage;
    }

    async crearEmpleado(nombre, apellido) {
        await this.employeePage.goToPIM();
        await this.employeePage.clickAddEmployee();
        await this.employeePage.fillEmployee(nombre, apellido);
        await this.employeePage.saveEmployee();
    }
}

module.exports = EmployeeFlow;