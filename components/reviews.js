import connectMongo from '../utils/connectmongo';
import Test from '../models/testmodel';
import { Textarea, Grid, Input } from "@nextui-org/react";
// import Test from '../models/testmodel';
// import Form from '../../components/formreview';

export const getServerSideProps = async () => {
  const tests = await Test.find()
  console.log("TESTS: "+ tests)
  return {
    props: {
      tests: tests
    }
  }
};

export default function Reviews({ tests }) {
    
    return (
    
      <div >
        <h1>Reviews</h1>
        {tests ?? [].map((test) => (
          <a
            href="https://nextjs.org/docs"
            key={test._id}
            
          >
            <h2>{test.title} &rarr;</h2>
            <p>{test.content}</p>

            
          </a>
        ))}
      </div>
    );
  }
  