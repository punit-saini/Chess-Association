// import Container from '../components/container';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import { client } from '../../lib/client';
import { motion as m } from 'framer-motion';

export default function Gallery({ posts }) {
  return (
    <m.div 
    initial={{y : "100%"}}
    animate={{y : "0%"}}
    exit={{opacity : 1}}
    transition={{duration : 0.75, ease: "easeOut"}}
     className='bg-gray-100 pb-24'>
    <div className="bg-gray-100 min-h-screen pb-30">
      <header className="py-12 lg:py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-2">Gallery</h1>
          <p className="text-xl text-gray-600 text-center mb-6">A collection of beautiful photos</p>
      </header>

        <div className="grid grid-cols-1 w-11/12 md:w-5/6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div className="bg-white rounded-lg my-6 shadow-md overflow-hidden" key={post._id}>
              
                <a target="_blank" rel="noopener noreferrer">
                  <div className="h-48 sm:h-56 md:h-64 relative">
                    <Image
                      src={urlFor(post.image).url()}
                      alt=""
                      layout="fill"
                      // objectFit="cover"
                      loading="lazy"
                    />
                  </div>
                </a>
             
              <div className="p-4">
             
                  <a href={`gallery/${post.slug.current}`} className="font-semibold text-gray-800 hover:text-gray-900 hover:underline">{post.title}</a>
               
              </div>
            </div>
          ))}
        </div>
    </div>
    </m.div>
  );
}

export async function getServerSideProps(){
  const posts = await client.fetch(`*[_type == "gallery"] | order(_createdAt desc)[0..4]{title, slug, image[0], _id}`);
  // console.log('posts are ', posts)
    return {
        props : {
            posts
        }
    }
}