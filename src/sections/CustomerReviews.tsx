
import { reviews } from "@/constants";

interface ReviewCardProps {
  imgURL: string;
  customerName: string;
  rating: number;
  feedback: string;
}

const ReviewCard = ({ imgURL, customerName, rating, feedback }: ReviewCardProps) => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <img
        src={imgURL}
        alt='customer'
        className='rounded-full object-cover w-[120px] h-[120px]'
      />
      <p className='mt-6 max-w-sm text-center font-josh text-dark-700'>
        {feedback}
      </p>
      <div className='mt-3 flex justify-center items-center gap-2.5'>
        <img
          src='/globe.svg'
          width={24}
          height={24}
          alt='rating star'
          className='object-contain m-0'
        />
        <p className='text-xl font-josh text-dark-700'>({rating})</p>
      </div>
      <h3 className='mt-1 font-josh text-3xl text-center font-bold'>
        {customerName}
      </h3>
    </div>
  );
};


const CustomerReviews = () => {
  return (
    <section className='max-container'>
      <h3 className='font-josh text-center text-4xl font-bold'>
        What Our
        <span className='text-green'> Customers </span>
        Say?
      </h3>
      <p className='m-auto mt-4 max-w-lg  text-center font-josh text-dark-700'>
        Hear genuine stories from our satisfied customers about their
        exceptional experiences with us.
      </p>

      <div className='mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14'>
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            imgURL={review.imgURL}
            customerName={review.customerName}
            rating={review.rating}
            feedback={review.feedback}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
