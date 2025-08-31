
const Subscribe = () => {
  return (
    <section
      id='contact-us'
      className='max-container flex justify-between items-center max-lg:flex-col gap-10'
    >
      <h3 className='text-4xl leading-[68px] lg:max-w-md font-josh font-bold'>
        Sign Up for
        <span className='text-green'> Updates </span>& Newsletter
      </h3>
      <div className='lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-dark-500 rounded-full'>
        <input type='text' placeholder='subscribe@nike.com' className='input' />
        <div className='flex max-sm:justify-end items-center max-sm:w-full'>
          <button className='flex justify-center items-center gap-2 px-7 py-4 border font-josh text-lg leading-none bg-green rounded-full text-light-100 border-green'>
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
