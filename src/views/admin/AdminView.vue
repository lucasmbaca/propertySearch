<script setup>
import usePropiedades from '../../composables/usePropiedades'
import { precioProperty } from '@/helpers';

const { propiedadesCollection, deleteItem} = usePropiedades()

console.log(propiedadesCollection)
</script>

<template>
    <h2 class="text-center text-h3 font-weight-bold my-5">Administrador de propiedades</h2>

    <v-btn
        class="font-weight-bold"
        color="blue"
        :to="{name:'nueva-propiedad'}"
    >
        Agregar Propiedad
    </v-btn>

    <v-card class="mx-auto mt-10" flat>
        <v-list-item
            v-for="propiedad in propiedadesCollection"
            :key="propiedad.id"
        >
            <template v-slot:prepend>
                <v-list-item-media :start="true">
                    <img width="180" :src="propiedad.imagen"/>
                </v-list-item-media>
            </template>

            <v-list-item-title class="font-weight-bold">{{ propiedad.titulo }}</v-list-item-title>
            <v-list-item-subtitle>{{ precioProperty(propiedad.precio) }}</v-list-item-subtitle>
            <template v-slot:append>
                <v-btn
                    color="blue"
                    class="mr-2"
                    :to="{name:'editar-propiedad', params:{id:propiedad.id }}"
                >
                    Editar
                </v-btn>
                <v-btn
                    color="red-accent-4"
                    @click="deleteItem(propiedad.id, propiedad.imagen)"
                >
                    Eliminar
                </v-btn>
            </template>
        </v-list-item>
    </v-card>
</template>