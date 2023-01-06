import Header from "../../components/header";
import { Card, Grid, Row, Text, Col, Image, Spacer } from "@nextui-org/react";

export const getStaticPaths = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.APIKEY,
            'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
        }
    };
    
    const res = await fetch('https://sephora.p.rapidapi.com/products/list?categoryId=cat140006&pageSize=60&currentPage=1', options);
    const data = await res.json();
    // console.log(data["products"])
  
    // map data to an array of path objects with params (id)
    const paths = data["products"].map(product => {
        // console.log(product["productId"])
      return {
        params: { product: product["productId"].toString() }
      }
    })
  
    return {
      paths,
      fallback: false
    }
  }

  export const getStaticProps = async (context) => {
    const id = context.params.product;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.APIKEY,
            'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
        }
    };
    const res = await fetch('https://sephora.p.rapidapi.com/products/detail?productId=' + id +'&preferedSku=2210607', options);
    const data = await res.json();
    // console.log(data)
  
    return {
      props: { product: data }
    }
  }

const Detail = ({product}) => {
    
    return (
        <div> 
            <Header></Header>
            <div className="container">
              <Spacer y={2}></Spacer>
              <Grid.Container gap={2} justify="center">
                <Grid xs={6}>
                <Image
                    // width={320}
                    // height={180}  
                    src= { product["currentSku"].skuImages.image1500}
                    // alt="Default Image"
                    objectFit="cover"
                    />
                    
                </Grid>
                <Grid xs={6}>
                    <Col>
                  
                    <Text h3 color="white">{ product["brand"].displayName}</Text>
                    <Text h2 color="secondary"> { product.displayName}</Text>
                    </Col>
                

                </Grid>
            </Grid.Container>  
            </div>
            
       </div>

    );
};

export default Detail