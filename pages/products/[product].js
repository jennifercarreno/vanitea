import Header from "../../components/header";
import { Card, Grid, Row, Text, Col, Image, Spacer, Input, Textarea, Button } from "@nextui-org/react";
// import Form from "../../components/formreview";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'react-iconly'


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
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tagInput, setTagInput] = useState("");
  const { data: session } = useSession();
  const tagList = []

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), firstTag: '' },
  ]);
  

    const addMemberRow = () => {
      //Todo generate random id
  
      let _inputFields = [...inputFields]
      _inputFields.push({ id: uuidv4(), firstTag: '' })
      setInputFields(_inputFields)
    }

    const handleChangeInput = (id, event) => {
      const newInputFields = inputFields.map(i => {
        if(id === i.id) {
          i[event.target.name] = event.target.value
          

        }
        tagList.push(i.firstTag)
        // console.log(tagList)
        return i;
      })
      console.log("TAGLIST INSIDE HANDLE"+tagList)
      setInputFields(newInputFields);
      return tagList;
    }  


  const createTest = async (e) => {
    e.preventDefault();
    let list = handleChangeInput()
    console.log(tagList)
    const res = await fetch('/api/test/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        productId: product.productId,
        productImage: product["currentSku"].skuImages.image1500,
        productName: product.displayName,
        productBrand: product["brand"].displayName,
        userEmail: session.user.email,
        tags: list
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

        {/* MAIN PRODUCT INFO */}
        <Grid.Container gap={2} justify="center">

          {/* PRODUCT IMAGE */}
          <Grid xs={6}>
            <Image
              src= { product["currentSku"].skuImages.image1500 || null}
              objectFit="cover"
            />        
          </Grid>

          {/* PRODUCT DETAILS */}
          <Grid xs={6}>
            <Col>
            <Text h3 color="white">{ product["brand"].displayName}</Text>
            <Text h2 color="secondary"> { product.displayName}</Text>
            </Col>
          </Grid>
        </Grid.Container>  
            
        {/* REVIEW FORM */}

        {/* if not signed in */}
        {!session ? (
          // sign in prompt
          <>
            <p>Not signed in</p>
            <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
          ) : (
          // FORM
          <div className="container">
            <Spacer y={2}></Spacer>

              <form onSubmit={createTest} className="form">
                {error ? <div className="alert-error">{error}</div> : null}
                {message ? <div className="alert-message">{message}</div> : null}

              {/* TITLE */}
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
                
                {/* TAGS */}
                <div className="form-group">
                  <Spacer y={.5}></Spacer>
                  <div className="tags">
                  <label>Tag</label>

                  { inputFields.map(inputField => (
                  <div className="form-row" key={inputField.id}>
                    <Spacer y={.5}></Spacer>

                    <Row>
                    <Input
                      type= "text"
                      name="firstTag"
                      value={inputField.firstTag}
                      onChange={(event) => handleChangeInput(inputField.id, event)}
                    />
                    <Spacer y={.5}></Spacer>
                    <Button onClick={addMemberRow} icon={<Plus set="bold" fill="currentColor"/>} rounded auto color="secondary">   
                    </Button>
                    </Row>

                    </div>))}
                  
                  </div>
          

                          
                </div>
                
                {/* CONTENT */}
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
                
                {/* SUBMIT BUTTON */}
                <div className="form-group">
                  <Spacer y={.5} />
                  <Button color="secondary" type="submit" className="submit_btn">
                    Add Post
                  </Button>
                </div>
              </form>

          </div>  
          )}
            
        </div>
            {/* <Reviews></Reviews> */}
       </div>

    );
};

export default Detail