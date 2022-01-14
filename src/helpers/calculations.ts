export class Calculator{

    private cuota: number;
    private timer: Timer;

    constructor(cuota: number, intervalo: number){
        this.cuota = cuota;
        this.timer = new Timer(intervalo);
    }

    calcularConsumo(consumo: number){
        while(consumo >= this.cuota){
            consumo = consumo - this.cuota;
            this.timer.setHora(this.timer.siguiente())
        } 
        return {
            consumo,
            date: this.timer.toString()
        }
    }

    calcularMegasDisponibles(fecha: Date){
        let megas: number = 0;
        while(this.timer.siguiente() <= fecha){
            megas += this.cuota;
            this.timer.setHora(this.timer.siguiente())
        }
        return {
            megas,
            date: this.timer.toString()
        }
    }

    syncTimer(h: Date = new Date()){
        this.timer.sincronizar(h);
    }
}

class Timer {

    private intervalo: number;
    private hora: Date;

    // Params:
    // intervalo: horas
    constructor(intervalo: number) {
        this.intervalo = intervalo;
        this.hora = new Date();
    }

    sincronizar(hora: Date){
        hora.setMinutes(0,0,0);
        while(hora.getHours() % this.intervalo != 0){
            hora.setHours(hora.getHours() - 1);
        }
        this.hora = hora;
    }

    setHora(h: Date){
        this.hora = h;
    }

    siguiente() {
        return new Date(this.hora.getTime() + this.intervalo * 60 * 60 * 1000);
    }

    toString(){
        return `${this.hora.getDate()}/${this.hora.getMonth() + 1}/${this.hora.getFullYear()} H: ${this.hora.getHours()}:00`
    }

}
