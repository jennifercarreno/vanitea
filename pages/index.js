import styles from '../styles/Home.module.css'
import Link from 'next/link'
import SearchBar from '../components/searchbar';
import { Card, Grid, Row, Text, Col } from "@nextui-org/react";


// getd generic top 50 makeup products
export const getServerSideProps = async () => {
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': process.env.APIKEY,
          'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
      }
  };
  
  const res = await fetch('https://sephora.p.rapidapi.com/products/list?categoryId=cat140006&pageSize=50&currentPage=1', options)
  const data = await res.json();
  console.log(data["products"])
       
  return{ props: {products: data["products"]}}
}

export default function Home({products}) {
  return(
    <div className={styles.container}>
      <Link href="/products/">
          list of products
        </Link>
      <SearchBar placeholder="Enter a Product Name..." data={products} />
    </div>
    
  )
 

}