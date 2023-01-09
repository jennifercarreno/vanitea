import { useSession, signIn, signOut, getSession } from "next-auth/react";
import {Row, User, Spacer, Image, Grid, Col, Button, Tooltip} from '@nextui-org/react'
import Header from '../../components/header'
import connectMongo from "../../utils/connectmongo";
import Test from "../../models/testmodel";
export const getServerSideProps = async ({req}) => {
    const session = await getSession({req})
    console.log(session)
    try {
      console.log('CONNECTING TO MONGO');
      await connectMongo();
      console.log('CONNECTED TO MONGO');
  
      console.log('FETCHING DOCUMENTS');
      const reviews = await Test.find({userEmail: session.user.email});

      console.log('FETCHED DOCUMENTS');
      console.log(reviews)
      return {
        props: {
          reviews: JSON.parse(JSON.stringify(reviews)),
        },
      };
    } catch (error) {
      console.log(error);
      return {
        props: {tests:[]}
      };
    }
  };

export default function UserHome({ reviews }) {
    const { data: session } = useSession();
    return (
        <div>
            <div width="100%"><Header></Header></div>

            {!session ? (
                <>
                  <p>Not signed in</p>
                  <br />
                  <button onClick={() => signIn()}>Sign in</button>
                </>
            ):(
                <div className="container">
                    {/* user details row */}
                    <Spacer y={1}></Spacer>
                    <Row>
                    <User
                    src={session.user.image}
                    zoomed
                    size="200px"
                    />
                    <h1 className="user-name">{session.user.name}</h1>
                    </Row>

                    <Spacer y={2}></Spacer>
                    <Row>
                        <h3>Favorite Products</h3>
                    </Row>

                    <Spacer y={2}></Spacer>
                    <Row>
                        <h3>Recent Reviews</h3>
                        
                    </Row>
                    {reviews?.map((review) => (
                        <div>

                        <Grid.Container>
                            <Grid xs={2}>
                                <Image src={review?.productImage} ></Image>

                            </Grid>
                            <Spacer x={1}></Spacer>
                            <Grid xs={6}>
                                <Col>
                                <a href={'/products/' + review?.productId} key={review?._id}>
                                <h2>{review?.productName} &rarr;</h2>
                                </a>
                                <Row>
                                {review?.tags.map((tag) => (
                                    <Tooltip > 
                                <Button shadow auto color="secondary">
                                    {tag}
                                </Button>
                                <Spacer x={1}></Spacer>
                                </Tooltip>
                                
                                    
                                ))}
                                </Row>
                                <Spacer y={1.5}></Spacer>
                                <p>{review?.content}</p>
                               
                                
                                
                                </Col>
                                
                            </Grid>
                               
                                
                             
                            
                        
                        </Grid.Container>
                       <Spacer y={1}></Spacer>
                        </div>
                            ))}
                </div>
            )}
        </div>
       
    )
}

