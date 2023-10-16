<script setup>
  import { ref } from 'vue'
  import {useRouter} from 'vue-router'
  import { validationSchema, imageSchema} from '../../validations/propiedadesSchema'
  import {useField, useForm} from 'vee-validate'
  import { useFirestore } from 'vuefire'
  import { collection, addDoc } from "firebase/firestore"; 
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
  import useImage from '../../composables/useImage'
  import useMapLocation from '../../composables/useMapLocation'


  //EXTRACCION DE FUNCION DESDE useImage y useMapLocation
  const { uploadImage, image, url } = useImage()
  const { zoom, center, pin } = useMapLocation()
  const router = useRouter()

  //BASE DE DATOS
  const db = useFirestore()
  
  const {handleSubmit} = useForm({
    validationSchema: {
      ...validationSchema,
      ...imageSchema
    }
  })

  //MAPEO DE CAMPOS DEL FORMULARIO 
  const titulo = useField('titulo')
  const imagen = useField('imagen')
  const precio = useField('precio')
  const habitaciones = useField('habitaciones')
  const wc = useField('wc')
  const estacionamiento = useField('estacionamiento')
  const descripcion = useField('descripcion')
  const alberca = useField('alberca', null, {
    initialValue:false
  })

  const submit = handleSubmit(async(values) => {
    // Add a new document with a generated id.

    const {imagen, ...propiedad} = values

    const docRef = await addDoc(collection(db, "propiedades"), {
      ...propiedad,
      imagen:url.value,
      ubicacion: center.value
    });
    
    if(docRef.id){
      router.push({name:'admin-propiedades'})
    }
  })

  const items = [1,2,3,4,5]

</script>

<template>
  <v-card class="mx-auto my-10" width="800" flat >
    <v-card-title class="font-weight-bold text-h3 mb-5"> Nueva Propiedad </v-card-title>
    <v-card-subtitle class="text-h5 py-5">Completa el siguiente formulario</v-card-subtitle>
    <v-form class="mt-10">
      <v-text-field class="mb-5" label="Nombre de la propiedad" v-model="titulo.value.value" :error-messages="titulo.errorMessage.value"/>
      
      <v-file-input 
        label="Fotografia" 
        class="mb-5" 
        accept="image/jpeg" 
        prepend-icon="mdi-camera" 
        v-model="imagen.value.value" 
        :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
      />

      <div v-if="image" class="my-5">
        <p class="font-weight-bold">imagen de la propiedad:</p>
        <img class="w-50" :src="image"/>
      </div>
      
      <v-text-field label="Precio" class="mb-5" v-model="precio.value.value" :error-messages="precio.errorMessage.value"/>

      <v-row>
        <v-col cols="12" md="4">
          <v-select label="Habitaciones" class="mb-5" :items="items" v-model="habitaciones.value.value" :error-messages="habitaciones.errorMessage.value"/>
        </v-col>

        <v-col cols="12" md="4">
          <v-select label="WC" class="mb-5" :items="items" v-model="wc.value.value" :error-messages="wc.errorMessage.value"/>
        </v-col>

        <v-col cols="12" md="4">
          <v-select label="Lugares Estacionamiento" class="mb-5" :items="items" v-model="estacionamiento.value.value" :error-messages="estacionamiento.errorMessage.value"/>
        </v-col>
      </v-row>

      <v-textarea label="Descripcion" class="mb-5" v-model="descripcion.value.value" :error-messages="descripcion.errorMessage.value"/>
      <v-checkbox label="alberca" class="mb-5" v-model="alberca.value.value"/>
      <div>
        <h2 class="font-weight-bold text-center">Ubicación</h2>
        <div style="height:600px" class="mb-5">
          <LMap 
            v-model:zoom="zoom" 
            :center="center" 
            :use-global-leaflet="false"
          >
            <LMarker
              :lat-lng="center"
              draggable
              @moveend="pin"
            />

            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn @click="submit" class="font-weight-bold" color="pink-accent-3" block>Agregar Propiedad</v-btn>

    </v-form>
  </v-card>
</template>