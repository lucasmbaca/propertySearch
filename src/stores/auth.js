import { ref, computed,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import {useFirebaseAuth} from 'vuefire'
import {signInWithEmailAndPassword,onAuthStateChanged, signOut} from 'firebase/auth'


export const useAuthStore = defineStore('auth', () => {
    const userAuth = ref(null)

    const router = useRouter()
    
    const auth = useFirebaseAuth()
    const errorMsg = ref('')
    const errorCode = {'auth/invalid-login-credentials': 'email o password incorrecto'}

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                userAuth.value = user
            }
        })
    })

    const login = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            userAuth.value = user
            router.push({name:'admin-propiedades'})
        })
        .catch(error => {
            errorMsg.value = errorCode[error.code]
        })
    }

    const logOut = () => {
        signOut(auth).then(() => {
            userAuth.value = null
            router.push({name:'iniciar-sesion'})
        })
    }

    const isAuth = computed(() => {
        return userAuth.value
    })
    
    return{
        login,
        logOut,
        errorMsg, 
        isAuth
    }
})