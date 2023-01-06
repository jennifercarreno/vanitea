// home page for reviews
import connectMongo from '../../utils/connectMongo';
import Test from '../../models/testmodel';
import { Textarea, Grid, Input } from "@nextui-org/react";
import Form from '../../components/formreview';

export const getServerSideProps = async () => {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING DOCUMENTS');
    const tests = await Test.find();
    console.log('FETCHED DOCUMENTS');

    return {
      props: {
        tests: JSON.parse(JSON.stringify(tests)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default function Home({ tests }) {
    
    return (
    
      <div >
{/*     FORM     */}
        <Form></Form>
          {/* <div className="container"> <button onClick={createTest}>Create Test</button></div> */}
        {tests.map((test) => (
          <a
            href="https://nextjs.org/docs"
            key={test._id}
            
          >
            <h2>{test.title} &rarr;</h2>
            <p>{test.content}</p>

            
          </a>
        ))}
      </div>
      // ...
    );
  }
  