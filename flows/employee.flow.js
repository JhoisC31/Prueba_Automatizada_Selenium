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
        await this.employeePage.goToPIM();
        await this.employeePage.buscarEmpleado(nombre);
    }

    async eliminarEmpleado(nombre) {
        await this.employeePage.goToPIM();
        await this.employeePage.buscarEmpleado(nombre);
        await this.employeePage.eliminarPrimerEmpleado();
    }
}

module.exports = EmployeeFlow;