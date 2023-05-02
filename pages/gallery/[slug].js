import react, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '../../lib/client'
import { urlFor } from '../../lib/client'

export default function slug({post}){
    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <header className="py-12 lg:py-16 w-5/6 mx-auto md:w-4/6 lg:w-1/2">
               
                    <h1 className="text-4xl sm:text-5xl font-bold text-center leading-loose text-gray-800 mb-6">{post?.title}</h1>
                    <p className="text-xl text-gray-600 text-center mb-6">{post?.description[0]?.children[0]?.text}</p>
               
                </header>
               
                  <div className=" mb-16 w-11/12 md:w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {post?.image.map((image) => (
                      <div className="bg-white rounded-lg shadow-md overflow-hidden" key={image._key}>
                        <div className="h-48 sm:h-56 md:h-64 relative">
                          <Image
                            src={urlFor(image).url()}
                            alt={'cgsca'}
                            layout="fill"
                            objectFit="cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
              
              </div>
        </>
    )
}

export async function getStaticPaths(slug){
    const query = `*[_type == "gallery"]{
        slug {
            current
        }
    }`;
    // console.log('query is : ', query)
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
    // console.log('slug is :'+ slug)
    const query = `*[_type == "gallery" && slug.current == '${slug}'][0]`;
    
    const post = await client.fetch(query);
    
    //  console.log('post is : ', post)
    return {
      props: {  
        post : post
       }
    }
  }
  




