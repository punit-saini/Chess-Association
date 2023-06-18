import React, { useState, useEffect, useRef} from "react"
import { useKeenSlider } from "keen-slider/react"
import Link from "next/link"
import { urlFor } from '../lib/client'
import { client } from '../lib/client';
// import { XMarkIcon } from '@heroicons/react/20/solid'
import { animateScroll as scroll } from "react-scroll";
import { motion as m } from "framer-motion";


export default ({ bannerImage, blogs, notices, newsArticles,galleryPosts}) => {
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const duration = 500;
  
  const nodeRefs = [
      useRef(null),
      useRef(null),
      useRef(null)
  ]
  
  

  
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  const animation = { duration: 4000, easing: (t) => t }

  // const animation = { duration: 4000, easing: (t) => t }
  const [verticalSliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: true,
    created(s) {
      s.moveToIdx(1, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation)
    },
    slides: {
      origin: "center",
      perView: 2,
      spacing: 4,
    },
    vertical : true,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 4000);
  
    return () => clearInterval(interval);
  }, [instanceRef]);
  

  return (
    <m.div

    initial={{y : "100%"}}
    animate={{y : "0%"}}
    exit={{opacity : 1}}
    transition={{duration : 0.75, ease: "easeOut"}}
    >
     
   

        

      <div>
          

          {/* Marquee */}

         {/* <div className="animator w-full">
              <div className="overflow-hidden whitespace-nowrap mx-auto mt-4 lg:mt-8">
                <div className="animate-scrolling flex">
                    {marquees?.map((marquee)=>{
                      return (<>
                            <div href={'#'} key={marquee._id} className="mx-auto py-1 px-2 mr-1 text-sm md:text-md text-white bg-my-black drop-shadow-2xl rounded-xl w-fit">
                              <Link href={marquee.link} rel="noopener noreferrer" target="_blank">{marquee.text}</Link>
                            </div>
                      </>)
                    })}
                </div>
              </div>
            </div>
          </div>  */}



              
              <div>
          <div className="relative isolate flex items-center gap-x-6 z-0 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-gray-900">
          <strong className="font-semibold">CGSCA Tournaments</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Get yourself registered to participate in upcoming CGSCA organised events. 
        </p>
        <Link
          href="/registration"
          className="flex-none rounded-full pb bg-gray-900 px-3.5 pt-1 pb-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Register now <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          {/* <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" /> */}
        </button>
      </div>
    </div>
    </div>
       
   
        
        
         



        {/* Carousel  */}
      

        <div className=" navigation-wrapper w-11/12 lg:w-5/6 mx-auto mt-16">
        <div ref={sliderRef} className="keen-slider keen-slider-carousel rounded-xl">
          {bannerImage[0] && <div className="keen-slider__slide"><img className=" w-full h-[100%]" src={urlFor(bannerImage[0].image).url()} /></div> }
          {bannerImage[1] && <div className="keen-slider__slide"><img className=" w-full h-[100%]" src={urlFor(bannerImage[1].image).url()} /></div> }
          {bannerImage[2] && <div className="keen-slider__slide"><img className=" w-full h-[100%]" src={urlFor(bannerImage[2].image).url()} /></div> }
          {bannerImage[3] && <div className="keen-slider__slide"><img className=" w-full h-[100%]" src={urlFor(bannerImage[3].image).url()} /></div> }
          {bannerImage[4] && <div className="keen-slider__slide"><img className=" w-full h-[100%]" src={urlFor(bannerImage[4].image).url()} /></div> }
          {bannerImage[5] && <div className="keen-slider__slide"><img className=" w-full h-[100%]" src={urlFor(bannerImage[5].image).url()} /></div> }
       </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </div>
      )}
 


      {/* Notice & CGSA*/}



<div>

<div className="bg-white py-8 px-4 md:py-16 md:px-8 mt-14">
  <div className="max-w-screen-xl mx-auto md:grid md:grid-cols-3 md:gap-8">
    <div className="md:col-span-2">
      <div className="  rounded-lg shadow-lg md:shadow-xl">
        <h2 className="text-3xl font-bold py-2 px-4 border-b-2 border-gray-300 mb-6">
          Notice Board
        </h2>
        <div className="space-y-6 w-5/6 bg-gray-50 py-3 px-2 mx-auto md:w-full  overflow-y-scroll h-[433px]">
          {notices.map((notice) => (
            <div key={notice._id} className="border-b border-gray-300 pb-6">
              <div className="flex items-center space-x-4">
                {/* <svg className="w-8 h-8 fill-current text-gray-600">
                  <use xlinkHref="/sprite.svg#icon-file-text"></use>
                </svg> */}
                <img src="notice.gif" className="w-8 h-8" />
                <a href={`${notice.fileURL}?dl=Notice Dated ${notice._updatedAt.slice(0,10)}.pdf`} download={true}  className="text-lg font-bold text-gray-700 hover:underline">
                  {notice.noticeHeading}
                </a>
              </div>
              <p className="text-gray-600 font-medium py-2 relative top-3 left-9 px-3 rounded-xl  bg-gray-100 w-fit text-sm mt-2">
                {notice._updatedAt.slice(0,10)}
              </p>
            </div>
          ))}
        </div>
       
      </div>
    </div>
    <div className="mt-8  md:mt-0">
      <div className="bg-white p-6">
        <img className="w-24 h-24 mx-auto mb-2" src={'../logo.png'} alt="CGSCA Logo"/>
        <div className="text-center text-xl text-gray-800 font-bold mb-2">
          Chhattisgarh Rajya Shatranj Sangh

        </div>
        <div className="text-center text-base text-gray-600 font-medium mb-2">
          REG NO. 155/2001 <br/>
          Affiliated to All India Chess Federation
        </div>
        <div className="text-center text-base text-gray-600 font-medium mb-2">
          Recognized by Sports and Youth Welfare Chhattisgarh Government
        </div>
        <div className=" flex-col justify-center mx-auto text-center">
             <img src="CGSCA SCR.jpeg" className="mx-auto w-36 h-36 " />
             <h1 className='m-4 font-bold text-xl'>UPI ID : 9827161369m@pnb</h1>
             <Link href={'/payments'} type="button" className=" w-fit mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Make Payments</Link>
        </div>
        {/* <div className="flex justify-center space-x-4 mt-4">
          <img className="w-12 h-12" src="../aicf-logo.webp" alt="AICF Logo"/>
          <img className="w-12 h-12" src="../government-logo.webp" alt="Sports and Youth Welfare CG Logo"/>
        </div> */}
      </div>
    </div>
  </div>
</div>





  </div>
     







      {/* Tournament News & Blogs */}


    


<div className=" py-8 mt-12 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">Blogs &amp; Tournament News</h2>
    </div>
    <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
      {blogs ? blogs.map((blog) => (
        <div key={blog._id} className="flex flex-col w-5/6 mx-auto rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
          <div className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src={urlFor(blog.headerImage).url()} alt={blog.title} />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <Link href={`blog/${blog.slug.current}`} className="block text-xl font-semibold text-gray-900 mb-3 hover:underline hover:underline-offset-4 transition-colors duration-300">{blog.title}</Link>
              <p className="text-base text-gray-500 line-clamp-3">{blog.description}</p>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="./user.png" alt="User Icon" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                <p className="text-sm text-gray-500">{blog.uploadDate}</p>
              </div>
            </div>
          </div>
        </div>
      )) : <h1 className="text-center mt-8">No blogs!</h1>}
    </div>
  </div>
</div>







<div>






         
                     
      </div>



      {/* Sponsor  */}



<div className="w-11/12 my-16 md:w-5/6 lg:w-3/6 min-h-60  mx-auto rounded-xl bg-my-yellow text-my-black px-6 py-8 mb-6 shadow-lg">
  <div className="flex justify-center items-center mb-6">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-20 md:w-20 text-my-black" viewBox="0 0 20 20" fill="currentColor">
      <path filRule="evenodd" d="M4.054 4.054c.53-.53 1.237-.822 1.98-.822s1.45.292 1.98.822L10 7.637l2.986-2.586c.53-.53 1.237-.822 1.98-.822s1.45.292 1.98.822c.53.53.822 1.237.822 1.98s-.292 1.45-.822 1.98L12.363 10l2.586 2.986c.53.53.822 1.237.822 1.98s-.292 1.45-.822 1.98c-.53.53-1.237.822-1.98.822s-1.45-.292-1.98-.822L10 12.363l-2.986 2.586c-.53.53-1.237.822-1.98.822s-1.45-.292-1.98-.822c-.53-.53-.822-1.237-.822-1.98s.292-1.45.822-1.98L7.637 10 4.054 7.014c-.53-.53-.822-1.237-.822-1.98s.292-1.45.822-1.98z" clipRule="evenodd" />
    </svg>
  </div>
  <h1 className="text-center font-semibold text-2xl md:text-3xl leading-8 tracking-wider mb-4">Sponsor Our Event and Make a Difference!</h1>
  <p className="text-center text-md md:text-lg mb-6">By sponsoring our events, you'll be making a positive impact on our mission and helping us achieve our goals. Your support will make these events a success and enable us to continue making a difference.</p>
  <div className="flex justify-center">
    <a className="py-3 px-6 text-base font-semibold tracking-wider text-white bg-my-black rounded-lg hover:bg-gray-900 transition duration-200" href="/contact-us">Get in Touch</a>
  </div>
</div>




    


      {/* In The News */}

        <div className="w-5/6 mx-auto my-16">


            <h1 className="text-2xl font-semibold border-b-2 border-my-green pb-2 mb-4">In The News</h1>


            
            <div className="overflow-x-auto">
  <div className="flex flex-wrap justify-start">
    {newsArticles.map((newsArticle) => (
      <div
        key={newsArticle._id}
        className="w-full md:w-1/2 lg:w-1/3 p-4"
      >
        <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
          <a href={newsArticle.articleLink} target="_blank">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={urlFor(newsArticle.image).url()}
              alt=""
            />
          </a>
          <div className="p-6">
            <a href={newsArticle.articleLink} className="min-w-30 " target="_blank">
              <h2 className="text-base font-medium text-gray-900 mb-3  h-30 md:h-20 overflow-hidden">
                {newsArticle.newsTitle}
              </h2>
            </a>
            <a
              href={newsArticle.articleLink}
              target="_blank"
              className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900 "
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>



          
          {/* Gallery */}


          <div className="gallery my-16">
  <h1 className="text-2xl font-semibold border-b-2 border-my-green pb-2 mb-4">Gallery</h1>

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 my-12">
    {galleryPosts && galleryPosts.map((galleryPost)=>{
      return(
        <Link key={galleryPost._id} className="mb-12" href={`/gallery/${galleryPost.slug.current}`}>
          <div className="relative h-[250px]">
            <img
              className="w-full h-full object-cover rounded-md"
              src={urlFor(galleryPost.image).url()}
              alt={galleryPost.title}
            />
            <div className="absolute inset-0 flex items-center h-[250px] bg-slate-950 bg-opacity-40 justify-center hover:opacity-0 opacity-100 transition-opacity duration-300">
              <p className="text-center text-white text-lg font-bold px-2">{galleryPost.title}</p>
            </div>
          </div>
        </Link>
      )
    })}
  </div>
</div>




            


         </div>
      











            
</div>



    
      
    </m.div>
  )
}

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}


export async function getStaticProps(){

  // const marquees = await client.fetch(`*[_type == "marquee"][0...3]`);
  const bannerImage = await client.fetch(`*[_type == "banner"][0...5]`);
  const blogs = await client.fetch(`*[_type == "blog"] | order(_createdAt desc)[0..9]{author,title, uploadDate, slug, _id, headerImage}`);
  const notices = await client.fetch(`*[_type == "notice"] | order(_createdAt desc)[0..9]{title, "fileURL" : file.asset->url, _updatedAt, noticeHeading, _id}`);
  const newsArticles = await client.fetch(`*[_type == "news"] | order(_createdAt desc)[0..5]`);
  const galleryPosts = await client.fetch(`*[_type == "gallery"] | order(_createdAt desc)[0..5]{title, slug, image[0], _id}`);
  //  console.log('marquees is :  ','\n banner Images are : ', bannerImage, ' \n blog is : ', blogs, '\n notices are : ', notices, '\n gallery data is : ', galleryPosts);
  return {
    props : {
     bannerImage, blogs, notices,newsArticles, galleryPosts
    }
  }
  
}
