const URL = 'https://maro-cares.onrender.com/product/getAllProduct/';
const getAllProduct = (setAllProduct, setServerErrors, setServerloading, pageNumber, setTotalPage, setCurrentPage) => {
    setServerloading(true)
    fetch(`${URL}${pageNumber}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setServerloading(false)
                setTotalPage(responseJson.totalPage)
                setCurrentPage(responseJson.currentPage)
                setAllProduct(responseJson.products)
            } else {
                setServerErrors(responseJson.message);
                setServerloading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setServerloading(false)
        })
}
export default getAllProduct;