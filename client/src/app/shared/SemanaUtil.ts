export class SemanaUtils {
    public static calcularSemana() {
        let semana;
        const hoy = new Date();
        if (hoy >= new Date(2019, 7, 22) && hoy <= new Date(2019, 7, 30)) {
            semana = '1';
        } else if (hoy >= new Date(2019, 8, 2) && hoy <= new Date(2019, 8, 6)) {
            semana = '2';
        } else if (hoy >= new Date(2019, 8, 9) && hoy <= new Date(2019, 8, 13)) {
            semana = '3';
        } else if (hoy >= new Date(2019, 8, 16) && hoy <= new Date(2019, 8, 20)) {
            semana = '4';
        } else if (hoy >= new Date(2019, 8, 23) && hoy <= new Date(2019, 8, 27)) {
            semana = '5';
        } else if (hoy >= new Date(2019, 8, 30) && hoy <= new Date(2019, 9, 4)) {
            semana = '6';
        } else if (hoy >= new Date(2019, 9, 7) && hoy <= new Date(2019, 9, 11)) {
            semana = '7';
        } else if (hoy >= new Date(2019, 9, 14) && hoy <= new Date(2019, 9, 20)) {
            semana = '8';
        } else if (hoy >= new Date(2019, 9, 21) && hoy <= new Date(2019, 9, 27)) {
            semana = '9';
        } else if (hoy >= new Date(2019, 9, 28) && hoy <= new Date(2019, 10, 3)) {
            semana = '10';
        } else if (hoy >= new Date(2019, 10, 4) && hoy <= new Date(2019, 10, 10)) {
            semana = '11';
        } else if (hoy >= new Date(2019, 10, 11) && hoy <= new Date(2019, 10, 17)) {
            semana = '12';
        } else if (hoy >= new Date(2019, 10, 18) && hoy <= new Date(2019, 10, 24)) {
            semana = '13';
        } else if (hoy >= new Date(2019, 10, 25) && hoy <= new Date(2019, 11, 1)) {
            semana = '14';
        }

        return semana;
    }
}
