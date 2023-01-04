import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout";
import Header from "../components/header";
import TodoItem from "../components/item";


// gets data from sephora api
export async function getStaticProps() {
 
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b82bf727eamshb441fb23f205663p15f593jsn4d803957ffad',
      'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
    }
  };
  const res = await fetch('https://sephora.p.rapidapi.com/auto-complete?q=rare%20beauty', options)
  const allPostsData = await res.json();
     
  return {props: {allPostsData}};
}

// displays data
export default function Home({allPostsData}) {
  return(
    <div className={styles.container}>
      {/* <button onClick={callAPI}>Add Todo</button> */}
      <p>{allPostsData.typeAheadTerms[3]["brandName"]}</p>
    </div>
    
  )
 

}