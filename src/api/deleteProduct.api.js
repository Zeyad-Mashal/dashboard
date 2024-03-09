const URL = 'https://maro-cares.onrender.com/product/removeProduct/';
const AccessTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGY3MWQ4MjYyOWU2YjUwMGYzM2Q0YSIsImlhdCI6MTcwOTMwMDM1NH0.1PJQpvJ1BduIgSMfeP6G4fYkkNpEcSZ8iVeSEUODmr4';

const searchInput = (setError, setLoading, setAllProduct, productId) => {
    setLoading(true)
    fetch(`${URL}${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authrization": `maroTK${AccessTOKEN}`
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllProduct(responseJson.products)
                setLoading(false)
                document.querySelector(".delete-product").classList.replace("d-block", "d-none");
            } else {
                setError(responseJson.message);
                setLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default searchInput;