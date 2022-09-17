import {tipoProducto} from "./tipoProducto";

export class Producto  {
    idProducto!: number;
    idTipoProducto!: tipoProducto;
}

export class PresentacionProducto  {
    idPresentacionProducto!: number;
    codigo!: string;
    nombre!: string;
    idProducto!: Producto;
    existenciaProducto!: ExistenciaProducto;
}

export class ExistenciaProducto {
    precioVenta!: number;
    cantidad!: number;
}
