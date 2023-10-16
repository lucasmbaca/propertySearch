<script setup>
  import Propiedad from '../components/Propiedad.vue'
  import usePropiedades from '../composables/usePropiedades';
  import { precioProperty } from '../helpers/index'

  const {propiedadesFiltradas, alberca} = usePropiedades()

</script>

<template>
  <h2 class="text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h2>

  <v-card class="py-10" flat>
    <v-card-title class="text-h5">Busqueda:</v-card-title>
    <v-checkbox label="Piscina" v-model="alberca"/>
    <v-row>
      <Propiedad
        v-for="propiedad in propiedadesFiltradas"
        :key="propiedad.id"
        :propiedad="propiedad"
        :price="precioProperty"
      />
    </v-row>
  </v-card>
</template>
