const URL = 'https://maro-cares.onrender.com/product/updateProduct/';
const AccessTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGY3MWQ4MjYyOWU2YjUwMGYzM2Q0YSIsImlhdCI6MTcwOTMwMDM1NH0.1PJQpvJ1BduIgSMfeP6G4fYkkNpEcSZ8iVeSEUODmr4';
const updateProduct = (productData, setError, setloading, setAllProduct, setTotalPage, setCurrentPage, productId) => {
    setloading(true)
    fetch(`${URL}${productId}`, {
        method: "PUT",
        headers: {
            "authrization": `maroTK${AccessTOKEN}`
        },
        body: productData
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setloading(false)
                setAllProduct(responseJson.products)
                setTotalPage(responseJson.totalPage)
                setCurrentPage(responseJson.currentPage)
                console.log(responseJson.products);
                document.querySelector(".update-prodcut_popup").classList.replace("d-flex", "d-none");
            } else {
                setError(responseJson.message);
                setloading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setloading(false)
        })
}
export default updateProduct;