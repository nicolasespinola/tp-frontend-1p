import Servicio from "./servicio";
import {tipoProducto} from "./tipoProducto";

export class Producto  {
    idProducto!: number;
    idTipoProducto!: tipoProducto;
}

export class PresentacionProducto  {
    idPresentacionProducto!: number;
    nombre!: string;
    idProducto!: Producto;
    existenciaProducto!: ExistenciaProducto;
}

export class ExistenciaProducto {
    precioVenta!: number;
    cantidad!: number;
}

export default class ServicioDetalle {
    idServicioDetalle!: number;
    cantidad!: number;
    idPresentacionProducto!: PresentacionProducto;
    idServicio!: Servicio;
}
