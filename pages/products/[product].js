import Header from "../../components/header";
import { Card, Grid, Row, Text, Col, Image, Spacer, Input, Textarea, Button } from "@nextui-org/react";
import Form from "../../components/formreview";
import React, { useEffect, useState } from "react";

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
  const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [productId, setProduct] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

  const createTest = async () => {
    const randomNum = Math.floor(Math.random() * 1000);
    const res = await fetch('/api/test/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        productId: product.productId
      }),
    });
    const data = await res.json();
    console.log(data);
  };

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
            <div className="container">
        <Spacer y={2}></Spacer>
        <form onSubmit={createTest} className="form">
      {error ? <div className="alert-error">{error}</div> : null}
      {message ? <div className="alert-message">{message}</div> : null}
      <div className="form-group">
        <label>Title</label>
        <Spacer y={.5} />
        <Input
            type= "text"
            placeholder= "Title of the post"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />
      </div>
      <div className="form-group">
        <Spacer y={1}></Spacer>
        <label>Content</label>
        <Spacer y={.5} />
        <Textarea
            // color="secondary"
            name= "content"
            placeholder= "Content of the post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            cols={20}
            rows={8}
            fullWidth="true"
        />
      </div>
      <div className="form-group">
        <Spacer y={.5} />

        <Button color="secondary" type="submit" className="submit_btn">
          Add Post
        </Button>
      </div>
    </form>
      </div>
            </div>
            
       </div>

    );
};

export default Detail