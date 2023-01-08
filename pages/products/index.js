// testing out sephora api, loads charlotte tilbury products and displays their name

import Header from "../../components/header";
import { Card, Grid, Row, Text, Col, Pagination } from "@nextui-org/react";
import Link from 'next/link'



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
    // console.log(data["products"])
         
    return{ props: {products: data["products"]}}
  }

const Products = ({products}) => {
  
    return (
     
        <div>
            <Header>

            </Header>
            <div className="container">
            <h1>All Products</h1>
            
            <Grid.Container gap={2} justify="center">
            {products.map(product => (
                
               

                <Grid  xs={12} sm={2}>
                <Card isPressable isHoverable>
                <Link 
                    href={'/products/' + product["productId"]}>

                    <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        showSkeleton
                        src={product["image450"]}
                        objectFit="cover"
                        width="300px"
                        // height={140}
                        alt={product["displayName"]}
                    />
                    </Card.Body>
                    <Card.Footer css={{ justifyItems: "flex-start" }}>
                    <Col>
                    <Text b>{product["displayName"]}</Text>
    
                    <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                        {product["brandName"]}
                    </Text>
                    </Col>
                    
                    
                    </Card.Footer>
                    </Link>
                    </Card>
                </Grid>
                

                
            ))}
            </Grid.Container>
            <Pagination total={20} initialPage={1}/>;
            
            </div>
            
        </div>
    )
}

export default Products