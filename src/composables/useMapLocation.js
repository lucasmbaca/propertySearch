import {ref} from 'vue'

export default function useMapLocation() {

    const zoom = ref(11)
    const center = ref([-38.735478,-72.5932389])

    function pin(e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
        console.log(center.value)
    }

    return {
        zoom,
        center,
        pin
    }
}