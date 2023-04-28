import react, {useState, useEffect} from 'react'
import Link from 'next/link'
import { client } from '../../lib/client'

export default function slug({post}){
    return (
        <>
           <h1>hello world {post?.title}</h1>
        </>
    )
}

export async function getStaticPaths(slug){
    const query = `*[_type == "gallery"]{
        slug {
            current
        }
    }`;
    console.log('query is : ', query)
    const galleryPosts = await client.fetch(query);
    //  console.log('gallery posts are : ', galleryPosts)
    const paths = galleryPosts.map((galleryPost) => ({
        params: { 
          slug: galleryPost.slug.current
        }
      }));

      return {
        paths,
        fallback : 'blocking'
      }
}


export async function getStaticProps ({ params: { slug }}) {
    console.log('slug is :'+ slug)
    const query = `*[_type == "gallery" && slug.current == '${slug}'][0]`;
    
    const post = await client.fetch(query);
    
  
    return {
      props: {  
        post : post
       }
    }
  }
  




