"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { RealEstate } from "@/api/listing";
import { ListingCard } from "./listing/listing-card";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type Props = {
  realEstates: Array<RealEstate>;
};

export const RealEstatesCarousel = ({ realEstates }: Props) => {
  return (
    <Carousel
      responsive={responsive}
      className="mt-8 pb-2"
      arrows={true}
      autoPlay
      swipeable
    >
      {realEstates.map((realEstate) => (
        <ListingCard key={realEstate.id} realEstate={realEstate} />
      ))}
    </Carousel>
  );
};
