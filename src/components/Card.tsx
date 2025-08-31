import Image from 'next/image';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadcnCard,
} from '@/components/ui/card';
import { Badge } from './ui/badge';

type CardProps = {
  imgURL: string;
  name: string;
  price: string;
};

const Card = ({ imgURL, name, price }: CardProps) => {
  return (
    <ShadcnCard className="relative mt-6 max-w-sm bg-white">
      <CardHeader className="absolute m-3.5">
        <Badge
          className="text-nowrap bg-white text-orange-600 text-xs"
          variant="secondary"
        >
          Best Seller
        </Badge>
      </CardHeader>
      <CardContent className="w-full bg-white">
        <div className="flex h-full w-full flex-col gap-2">
          <Image
            alt={name}
            className="inset-0 w-full object-contain"
            height={432}
            src={imgURL}
            width={432}
          />
          <div className="flex flex-col gap-3 px-3">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{price}</CardDescription>
          </div>
        </div>
      </CardContent>
    </ShadcnCard>
  );
};

export default Card;
