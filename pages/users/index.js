import { useSession, signIn, signOut, getSession } from "next-auth/react";
import {Row, User, Text, Spacer} from '@nextui-org/react'
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
                    {reviews.map((review) => (
                        <div>
                            <a
                                href={'/products/' + review.productId}
                                key={review._id}
                                
                            >
                                <h2>{review.productName} &rarr;</h2>
                                

                                
                            </a>
                            <p>{review.content}</p>
                        </div>
                            ))}
                </div>
            )}
        </div>
       
    )
}

