
import SearchBar from '../components/searchbar';
import { Row, Spacer, Text, } from "@nextui-org/react";
import Header from "../components/header";
import { SessionProvider } from "next-auth/react"



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

export default function Home({products, pageProps:session}) {

  

  return(
    <div width="100%">

      <div width="100%">
      <SessionProvider session={session}>
      <Header></Header>
      </SessionProvider>
      </div>

      <div className="container" >

    <Spacer y={3}></Spacer>
      <Text h1 size={60}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
        className="text-center"
      >
      vanitea
      </Text>
      <Text h1 size="$xs"
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
        className="text-center"
      >
      All Things Beauty, All in One Place
      </Text>
      
      <Spacer y={3}></Spacer>

        <Row className="justify-content-center">
        <SearchBar placeholder="Search" data={products} />
        </Row>

    
      </div>
    </div>
    
    
    
  )
 

}