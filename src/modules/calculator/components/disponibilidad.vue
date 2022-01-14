<template>

  <section class="container border mt-4 p-3">

    <h3 class="text-center">Disponibilidad</h3>

    <div class="alert alert-danger" v-if="msgs.length != 0">
      <p v-for="msg, index in msgs" :key='index'>{{msg}}</p>
    </div>

    <form class="row mt-4 justify-content-center">

      <div class="row col-sm-12 col-lg-6 mt-3">
        <label for="inputEmail3" class="col-md-2 col-sm-4 col-form-label">Cuota(MB)</label>
        <div class="col-sm-8">
          <input v-model="cuota" placeholder="Cuota" type="number" class="form-control" id="inputEmail3">
        </div>
      </div>

      <div class="row col-sm-12 col-lg-6 mt-3">
        <label for="inputEmail3" class="col-md-2 col-sm-4 col-form-label">Intervalo(H)</label>
        <div class="col-sm-8">
          <input v-model="intervalo" placeholder="Intervalo" type="number" class="form-control" id="inputEmail3">
        </div>
      </div>

      <div class="row col-sm-12 col-lg-6 mt-3 ">
        <label for="inputEmail3" class="col-md-2 col-sm-4 col-form-label">Inicio</label>
        <div class="col-sm-8">
          <input v-model="inicio" type="datetime-local" class="form-control" id="inputEmail3">
        </div>
      </div>

      <div class="row col-sm-12 col-lg-6 mt-3 ">
        <label for="inputEmail3" class="col-md-2 col-sm-4 col-form-label">Fin</label>
        <div class="col-sm-8">
          <input v-model="fin" type="datetime-local" class="form-control" id="inputEmail3">
        </div>
      </div>

      <div class="row col-12 justify-content-center mt-5">
        <button class="btn btn-primary col-4 " v-on:click.prevent="calcular()">Calcular</button>
      </div>

    </form>

    <div class="my-3" v-if="disponible">
      <h3 class="mx-3">Resultados:</h3>
      <p class="mx-5 mt-4">Disponible: {{ disponible.megas }}</p>
      <p class="mx-5 mt-4">Ultima Actualizacion: {{ disponible.date }}</p>
    </div>

  </section>

</template>
  
<script>
import { Calculator } from '@/helpers/calculations'
export default {
  data: function() {
      return {
        disponible: null,
        cuota: '',
        intervalo: 1,
        inicio: '',
        fin: '',
        msgs: []
      }
  },
  methods: {
    calcular(){
      if(this.validar()){
        let c = new Calculator(this.cuota, this.intervalo);
        c.syncTimer(new Date(this.inicio))
        this.disponible = c.calcularMegasDisponibles(new Date(this.fin))
        this.guardarDatos()
      }else{
        this.disponible = null
      }
    },
    validar(){
      this.msgs = []
      if(this.intervalo == 0) this.msgs.push('Ingrese el intervalo de actualizacion')
      if(this.cuota == 0) this.msgs.push('Ingrese la cuota asignada')
      if(this.inicio == this.fin) this.msgs.push('Las fechas de inicio y fin no pueden ser iguales')
      if(new Date(this.fin) - new Date(this.inicio) < this.intervalo * 3600000 ) this.msgs.push('La diferencia entre fechas es menor que el intervalo asignado.')
      return this.msgs.length == 0;
    },
    guardarDatos(){
      let data = {
        cuota: this.cuota,
        intervalo: this.intervalo,
      }
      localStorage.setItem('data', JSON.stringify(data))
    },
    cargarDatos(){
      let data = JSON.parse(localStorage.getItem('data'))
      if(data){
        this.cuota = data['cuota']
        this.intervalo = data['intervalo']
      }
    }
  },
  created(){
    this.cargarDatos()
    let d = new Date()
    this.inicio = `${d.getFullYear()}-${d.getMonth() + 1 > 10 ? d.getMonth() + 1 : '0' + ( d.getMonth() + 1)}-${d.getDate()}T${d.getHours()}:${d.getMinutes() > 10 ? d.getMinutes() : '0' + d.getMinutes()}`
    d.setHours(d.getHours() + this.intervalo)
    this.fin = `${d.getFullYear()}-${d.getMonth() + 1 > 10 ? d.getMonth() + 1 : '0' + ( d.getMonth() + 1)}-${d.getDate()}T${d.getHours()}:${d.getMinutes() > 10 ? d.getMinutes() : '0' + d.getMinutes()}`
  }
}
</script>

<style>

</style>