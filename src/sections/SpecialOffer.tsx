
import Image from "next/image";

const SpecialOffer = () => {
  return (
    <section className='flex justify-center items-center max-xl:flex-col-reverse gap-10 max-container'>
      <div className='flex-1'>
        <Image
          src='/trending-1.png'
          alt='Shoe Promotion'
          width={773}
          height={687}
          className='object-contain w-full'
        />
      </div>
      <div className='flex flex-1 flex-col'>
        <h2 className='text-4xl font-josh font-bold'>
          <span className='text-green'>Special </span>
          Offer
        </h2>
        <p className='mt-4 font-josh text-dark-700'>
          Embark on a shopping journey that redefines your experience with
          unbeatable deals. From premier selections to incredible savings, we
          offer unparalleled value that sets us apart.
        </p>
        <p className='mt-6 font-josh text-dark-700'>
          Navigate a realm of possibilities designed to fulfill your unique
          desires, surpassing the loftiest expectations. Your journey with us is
          nothing short of exceptional.
        </p>
        <div className='mt-11 flex flex-wrap gap-4'>
          <button className='flex justify-center items-center gap-2 px-7 py-4 border font-josh text-lg leading-none bg-green rounded-full text-light-100 border-green'>
            Shop now
          </button>
          <button className='flex justify-center items-center gap-2 px-7 py-4 border font-josh text-lg leading-none bg-light-100 rounded-full text-dark-700 border-dark-700'>
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
