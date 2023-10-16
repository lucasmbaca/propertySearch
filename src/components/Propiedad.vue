<script setup>
defineProps({
    propiedad: {
        type: Object
    },
    price:{
        type: Function
    }
})
</script>

<template>
    <v-col cols="12" md="3">
        <v-card>
            <v-img height="250" :src="propiedad.imagen" cover/>

            <v-card-title>{{ propiedad.titulo }}</v-card-title>

            <v-card-text class="text-truncate">{{ propiedad.descripcion }}</v-card-text>
            <v-card-text class="text-h5 font-weight-bold">{{ price(propiedad.precio) }}</v-card-text>

            <template v-slot:actions>
                <v-btn 
                    block
                    color="blue"
                    variant="flat"
                    :to="{name:'propiedad', params:{id:propiedad.id}}"
                >
                    Ver informaciones
                </v-btn>
            </template>

        </v-card>
    </v-col>
</template>