export const precioProperty =  (precio) =>
    Number(precio).toLocaleString('es-CL', {
        style:'currency',
        currency:'CLP'
    })
