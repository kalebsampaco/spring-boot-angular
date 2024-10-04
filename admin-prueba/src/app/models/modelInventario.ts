export interface Inventario
{
    id: number;
    cantidad: number;
    fechaIngreso: string;
    fechaModified: string;
    nombreProducto: string;
    userModified: number | null;
    userRegister: number | null;
}

export interface Empleado
{
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    edad: number;
    cargo: number;
    fechaIngreso: string;
}

export interface Cargo
{
    id: number;
    cargo: string
}
