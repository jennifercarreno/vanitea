// home page for reviews
import connectMongo from '../../utils/connectMongo';
import Test from '../../models/testmodel';

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
    const createTest = async () => {
        const randomNum = Math.floor(Math.random() * 1000);
        const res = await fetch('/api/test/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `Test ${randomNum}`,
            email: `test${randomNum}@test.com`,
          }),
        });
        const data = await res.json();
        console.log(data);
      };
    
    return (
    
      <div >
          <div className="container"> <button onClick={createTest}>Create Test</button></div>
        {tests.map((test) => (
          <a
            href="https://nextjs.org/docs"
            key={test._id}
            
          >
            <h2>{test.name} &rarr;</h2>
            <p>{test.email}</p>
          </a>
        ))}
      </div>
      // ...
    );
  }
  