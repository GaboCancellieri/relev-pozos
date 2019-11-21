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
import { Zona } from './types/zona';

export class Pozo {
    _id: string;
    nombre: string;
    activo: string;
    yacimiento: string;
    areaConcesion: string;
    areaReserva: string;
    region: string;
    zona: string;
    provincia: string;
    coordenadas: Coordenadas;
    etapa: string;
    estado: Estado;
    relevador: Relevador;
}
