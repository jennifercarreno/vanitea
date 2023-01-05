// testing out sephora api, loads charlotte tilbury products and displays their name

export const getStaticProps = async () => {
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.APIKEY,
          'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
        }
      };
      const res = await fetch('https://sephora.p.rapidapi.com/auto-complete?q=charlotte%20tilbury', options)
      const data = await res.json();
      console.log(data.products)
         
      return{ props: {products: data}}
}

const Products = ({products}) => {
    return (
        <div>
            <h1>All Products</h1>
            {products.map(product => (
                <div key={product.id}>
                <a >
                    <h3>{product["productName"]}</h3>
                </a>
                </div>
            ))}
        </div>
    )
}

export default Products