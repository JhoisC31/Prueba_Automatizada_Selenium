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

    async buscarEmpleado(nombre) {
        await this.employeePage.goToPIM(); // 👈 vuelve al listado
        await this.employeePage.buscarEmpleado(nombre);
    }
}

module.exports = EmployeeFlow;