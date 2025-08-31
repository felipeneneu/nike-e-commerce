
import Image from "next/image";

const SuperQuality = () => {
  return (
    <section
      id='about-us'
      className='flex justify-between items-center max-lg:flex-col gap-10 w-full max-container'
    >
      <div className='flex flex-1 flex-col'>
        <h2 className='font-josh capitalize text-4xl lg:max-w-lg font-bold'>
          We Provide You
          <span className='text-green'> Super </span>
          <span className='text-green'>Quality </span> Shoes
        </h2>
        <p className='mt-4 lg:max-w-lg font-josh text-dark-700'>
          Ensuring premium comfort and style, our meticulously crafted footwear
          is designed to elevate your experience, providing you with unmatched
          quality, innovation, and a touch of elegance.
        </p>
        <p className='mt-6 lg:max-w-lg font-josh text-dark-700'>
          Our dedication to detail and excellence ensures your satisfaction
        </p>
        <div className='mt-11'>
          <button className='flex justify-center items-center gap-2 px-7 py-4 border font-josh text-lg leading-none bg-green rounded-full text-light-100 border-green'>
            View details
          </button>
        </div>
      </div>

      <div className='flex-1 flex justify-center items-center'>
        <Image
          src='/shoes/shoe-10.avif'
          alt='product detail'
          width={570}
          height={522}
          className='object-contain'
        />
      </div>
    </section>
  );
};

export default SuperQuality;
