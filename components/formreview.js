import { Textarea, Grid, Input, Spacer, Button } from "@nextui-org/react";

import React, { useEffect, useState } from "react";

// export const getServerSideProps = async () => {
//     try {
//       console.log('CONNECTING TO MONGO');
//       await connectMongo();
//       console.log('CONNECTED TO MONGO');
  
//       console.log('FETCHING DOCUMENTS');
//       const tests = await Test.find();
//       console.log('FETCHED DOCUMENTS');
  
//       return {
//         props: {
//           tests: JSON.parse(JSON.stringify(tests)),
//         },
//       };
//     } catch (error) {
//       console.log(error);
//       return {
//         notFound: true,
//       };
//     }
//   };

export default function Form() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // creates the test post 
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
          }),
        });
        const data = await res.json();
        console.log(data);
      };
    
    return(
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

        
    )

}

