import { Textarea, Grid, Input } from "@nextui-org/react";
// const Test = require('../models/testmodel')
// import connectMongo from "../utils/connectmongo";
// import Test from "../models/testmodel";
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
        <form onSubmit={createTest} className="form">
      {error ? <div className="alert-error">{error}</div> : null}
      {message ? <div className="alert-message">{message}</div> : null}
      <div className="form-group">
        {/* <label>Title</label> */}
        <Input
            type= "text"
            placeholder= "Title of the post"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />
      </div>
      <div className="form-group">
        {/* <label>Content</label> */}
        <Textarea
            // color="secondary"
            name= "content"
            placeholder= "Content of the post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            cols={20}
            rows={8}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="submit_btn">
          Add Post
        </button>
      </div>
    </form>
    )

}

