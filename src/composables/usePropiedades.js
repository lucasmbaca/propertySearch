import { collection, doc, deleteDoc } from 'firebase/firestore'
import {ref as storageRef, deleteObject} from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { ref, computed } from 'vue'

export default function usePropiedades() {
    const db = useFirestore()
    const storage = useFirebaseStorage()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    const alberca = ref(false);

    const propiedadesFiltradas = computed(() => {
        return alberca.value ? 
            propiedadesCollection.value.filter(propiedad => propiedad.alberca):
            propiedadesCollection.value
    })

    async function deleteItem(id, urlImage) {
        const docRef = doc(db, 'propiedades', id)
        const imageRef  = storageRef(storage, urlImage)

        await Promise.all([
            deleteDoc(docRef),
            deleteObject(imageRef)
        ])
    }

    return {
        alberca,
        propiedadesCollection,
        propiedadesFiltradas,
        deleteItem
    }
}