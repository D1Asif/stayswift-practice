import Image from "next/image";

const Gallery = ({gallery}) => {
  const [mainPic, ...restGallery] = gallery;
  return (
    <section className="container">
      <div className="grid grid-cols-2 imageshowCase">
        <Image 
          src={mainPic} 
          className="h-[400px]" 
          alt="Main Picture"
          height={400}
          width={400} 
        />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          {
            restGallery?.map((subPic) => (
              <Image
                key={subPic} 
                src={subPic}
                alt="Sub Pic"
                height={400}
                width={400}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Gallery;
