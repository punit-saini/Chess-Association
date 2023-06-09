import moment from 'moment';
import Image from 'next/image';
import { client } from '../../lib/client';
import { urlFor } from '../../lib/client';
import { motion as m } from 'framer-motion';

export default function Blog({blog}) {
   const { title, author, uploadDate, headerImage, content } = blog
      
    // {console.log('k')}
  return (
    
    <m.div
    initial={{y : "100%"}}
    animate={{y : "0%"}}
    exit={{opacity : 1}}
    transition={{duration : 0.75, ease: "easeOut"}}
     className="bg-white min-h-screen shadow-md rounded-md overflow-hidden flex flex-col mx-auto my-16">

        <div className="h-64 sm:h-auto mx-auto md:w-[650px] md:mt-12 my-6 flex-col sm:w-1/2 ">
            <img
            className="w-full h-full md:rounded-lg sm:rounded-xl"
            src={urlFor(headerImage).url()}
            alt="Header Image"
            />
        </div>

        <div className="p-4 sm:p-6 flex flex-col justify-between md:w-4/6 mx-auto w-full">
            <div>
            <h1 className="text-3xl font-bold mb-4 font-serif">{title}</h1>
            <div className="text-gray-700 mb-4">
                <span className="font-bold">{author}</span>
                <span className="mx-2">&#8226;</span>
                <span>{moment(uploadDate).format('MMMM Do, YYYY')}</span>
            </div>
            <div className="prose max-w-full">
                {content[0].children[0].text}
            </div>
            </div>
        </div>

   </m.div>


  );
}


export async function getStaticPaths(slug){
    const query = `*[_type == "blog"]{
        slug {
            current
        }
    }`;
   
    const blogs = await client.fetch(query);
    //  console.log('blogs are  : ', blogs)
    const paths = blogs.map((blog) => ({
        params: { 
          slug: blog.slug.current
        }
      }));

      return {
        paths,
        fallback : 'blocking'
      }
}

export async function getStaticProps ({ params: { slug }}) {
    // console.log('slug is :'+ slug)
    const query = `*[_type == "blog" && slug.current == '${slug}'][0]`;
    
    const blog = await client.fetch(query);
    // console.log('blogs are ', blog)
  
    return {
      props: {  
         blog : blog
       }
    }
  }
  