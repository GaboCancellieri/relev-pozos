import { Estado } from './estado';
import { Relevador } from '../relevadores/relevador';
import { Area } from '../areas/area';
import { Etapa } from '../etapas/etapa';
import { Coordenadas } from './types/coordenadas';
import { Activo } from './types/activo';
import { Yacimiento } from './types/yacimiento';
import { AreaConcesion } from './types/area_concesion';
import { AreaReserva } from './types/area_reserva';
import { Region } from './types/region';
import { Provincia } from './types/provincia';

export class Pozo {
    _id: string;
    nombre: string;
    activo: Activo;
    yacimiento: Yacimiento;
    areaConcesion: AreaConcesion;
    areaReserva: AreaReserva;
    region: Region;
    provincia: Provincia;
    coordenadas: Coordenadas;
    etapa: Etapa;
    estado: Estado;
    relevador: Relevador;
}
