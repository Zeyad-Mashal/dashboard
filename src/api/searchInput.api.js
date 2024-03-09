const URL = 'https://maro-cares.onrender.com/product/dashboardSearch/';
const searchInput = (setError, setLoading, setAllProduct, searchKey) => {
    setLoading(true)
    fetch(`${URL}${searchKey}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllProduct(responseJson.products)
                setLoading(false)
            } else {
                setError(responseJson.message);
                setLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default searchInput;