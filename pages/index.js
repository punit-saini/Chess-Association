import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import Link from "next/link"
import { urlFor } from '../lib/client'
import { client } from '../lib/client';


export default ({marquees, bannerImage, blogs, notices, newsArticles,galleryPosts}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })


        const [verticalSliderRef] = useKeenSlider({
          loop: false,
          slides: {
            origin: "center",
            perView: 2,
            spacing: 10,
          },
          vertical: true,
        })

  return (
    <>

   
        

      <div>
          

          {/* Marquee */}

         <div className="animator w-full">
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
          </div> 
        
        
         
        


        {/* Carousel  */}
      

        <div className="navigation-wrapper w-11/12 mx-auto mt-6  lg:w-3/5 lg:mt-10">
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
 

      {/* Tournament News & Blogs */}


      <div className="w-11/12 lg:w-5/6 mx-auto mt-12 mb-12">
         <div className="heading flex justify-between">
             <h1 className="text-xl font-semibold border-b-2 border-my-green pb-2">Blogs & Tournament News</h1>
         </div>

        <div className=" flex mt-10 overflow-scroll ">

          {blogs ? blogs.map((blog)=>{
             return(
              <div className="keen-slider__slide  py-2 mr-5 w-5/6 px-4">
              <div className=" flex flex-col  justify-around border-2 h-[220px] border-my-black border-l-8 rounded-lg py-8 px-3 border-l-my-green w-[280px] lg:w-[400] ">
                  <h1 className="font-bold font-serif">{blog.title}</h1>
                  <div className="flex gap-2 mt-3">
                      <p className="py-1 px-2 bg-my-grey drop-shadow-md rounded-lg">{blog.uploadDate}</p>
                      <div className="flex gap-1 py-1 px-2 bg-my-grey drop-shadow-md rounded-lg">
                        <img src="./user.png" className=" w-5 h-5 mt-1" />
                          <p className="">{blog.author}</p>
                      </div>
                  </div>
              </div>
              </div>)

          }) : <h1 className="text-center mt-8"> No blogs!</h1>}
   

      </div>


      {/* Notice & CGSA*/}

      <div  className="w-11/12 lg:w-5/6 mx-auto md:flex md:justify-between  items-stretch my-16 ">


        <div className="notice-section w-fit mx-auto justify-self-center">
           
       


         <div className="heading flex justify-between">
             <h1 className="text-xl font-semibold border-b-2 border-my-green pb-2">Notices</h1>

         </div>

         <div className=" px-3 text-center w-fit drop-shadow-2xl">


         <div ref={verticalSliderRef} className="keen-slider" style={{ height: 350 }}>

             
              {notices.map((notice)=> {
                 return(
                  <div className="keen-slider__slide mb-4">
                        <div className=" max-w-[300px] p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                              <a href={`${notice.fileURL}?dl=Notice Dated ${notice._updatedAt.slice(0,10)}`} download={true} className=" z-50 inline-flex items-center hover:underline text-left mb-2 text-xl font-semibold tracking-tight text-my-black underline dark:text-white"> {notice.noticeHeading}  </a>
                            <p className="py-1 px-2 bg-my-grey drop-shadow-md rounded-lg text-sm w-fit">{notice._updatedAt.slice(0,10)}</p>
                      </div> 
                      
                  </div>
                 )
              })}

            
          </div>
            
                    
            <p className=" text-center md:hidden text-my-green mx-auto">________________________</p>
        </div> 

                




         </div>

          {/* cgsa */}
                      
          <div className=" w-fit">
             <img width={'250px'} className="mx-auto" src="/logo.png" />
             <h1 className=" font-medium leading-6 tracking-wide text-justify text-lg">Chhattisgarh State Chess Association - Promoting the intellectual and social benefits of chess for all.  State Chess Association is committed to making chess accessible and rewarding for everyone. Chhattisgarh State Chess Association - Promoting </h1>
         </div>  
      </div>



      {/* Sponsor  */}

      <div className="w-11/12 md:w-5/6 lg:w-3/6 min-h-60 my-auto mx-auto rounded-xl bg-my-yellow  text-my-black px-3 py-6 mb-6">
            <img src="/Tshirt.png" className="mx-auto sm:w-12 w-16" />
            <h1 className=" my-auto font-semibold text-lg leading-7 tracking-wider mb-4">Sponsor our event and make a difference! Your support will help us make this event a success and enable us to continue promoting mission. </h1>
            <Link className="py-2 font-mono px-3 text-md font-thin drop-shadow-lg text-white bg-my-black rounded-lg" href={'#'}>GET IN TOUCH</Link>
      </div>

    


      {/* In The New */}

        <div>


            <h1 className="text-2xl font-semibold border-b-2 border-my-green pb-2 mb-4">In The News</h1>


            
            <div className="md:flex justify-around">
                  
               
               {newsArticles.map((newsArticle)=>{
                    return(
                           
                      <div className="max-w-sm mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          <a className="h-[280px]" href="#">
                              <img className="rounded-t-lg m-auto h-[230px]" src={urlFor(newsArticle.image).url()} alt="" />
                          </a>
                            <div className="p-5">
                              <a href="#">
                                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{newsArticle.newsTitle}</h5>
                              </a>
                              <a href={newsArticle.articleLink} target="_blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-tr from-my-green to-my-black rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                  Read
                                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                              </a>
                            </div>
                      </div>
                    )
               })}

                

             </div>


          
          {/* Gallery */}



          <div className="gallery">
            <h1 className="text-2xl font-semibold border-b-2 border-my-green pb-2 mb-4">Gallery</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-1">
            

          {galleryPosts && galleryPosts.map((galleryPost)=>{
                return(
                     
                  <Link className="" href={`/gallery/${galleryPost.slug.current}`}>
                      <img
                          className="object-cover w-full border h-[270px]"
                          src={urlFor(galleryPost.image).url()}
                      />
                      <p href={'#'} className="mx-auto text-center text-my-black bg-my-yellow px-2 py-2 rounded-b-lg">{galleryPost.title}</p>
                    </Link>
                )

          })}

            
            
            
           
            
        
        </div>
          </div>



            


         </div>
      























            
</div>



    
      
    </>
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

  const marquees = await client.fetch(`*[_type == "marquee"][0...3]`);
  const bannerImage = await client.fetch(`*[_type == "banner"][0...5]`);
  const blogs = await client.fetch(`*[_type == "blog"] | order(_createdAt desc)[0..9]{author,title, uploadDate}`);
  const notices = await client.fetch(`*[_type == "notice"] | order(_createdAt desc)[0..9]{title, "fileURL" : file.asset->url, _updatedAt, noticeHeading}`);
  const newsArticles = await client.fetch(`*[_type == "news"] | order(_createdAt desc)[0..4]`);
  const galleryPosts = await client.fetch(`*[_type == "gallery"] | order(_createdAt desc)[0..4]{title, slug, image[0]}`);
   console.log('marquees is : ', marquees, '\n banner Images are : ', bannerImage, ' \n blog is : ', blogs, '\n notices are : ', notices, '\n gallery data is : ', galleryPosts);
  return {
    props : {
      marquees, bannerImage, blogs, notices,newsArticles, galleryPosts
    }
  }
  
}