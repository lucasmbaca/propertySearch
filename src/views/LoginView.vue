<script setup>
    import { loginSchema } from '../validations/loginSchema'
    import { useField, useForm } from 'vee-validate'
    import { useAuthStore } from '../stores/auth'

    const auth = useAuthStore()
    const { handleSubmit } = useForm({validationSchema:loginSchema})

    const email = useField('email')
    const password = useField('password')

    const submit = handleSubmit((values) => {
        auth.login(values)
    })
</script>

<template>
    <v-card
        max-width="600"
        class="mx-auto my-5"
        flat
    >
        <v-card-title class="font-weight-bold text-h3">
            Iniciar Sesión
        </v-card-title>
        <v-card-subtitle class="text-h5">
            Inicia sesión con tu cuenta
        </v-card-subtitle>

        <v-alert
            v-if="auth.errorMsg"
            class="my-5"
            type="error"
            :title="auth.errorMsg"
        ></v-alert>

        <v-form class="my-5">
            <v-text-field
                class="my-2"
                label="Correo electronico"
                type="email"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />
            <v-text-field
                class="my-2"
                label="password"
                type="password"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            />
            <v-btn block color="pink-accent-3" class="font-weight-bold" @click="submit">
                Iniciar Sesión
            </v-btn>

        </v-form>
    </v-card>
</template>