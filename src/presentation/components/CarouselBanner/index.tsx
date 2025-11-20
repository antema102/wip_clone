import React, { Fragment } from 'react';
import './style.scss';
import style from './style';
import { Carousel } from 'primereact/carousel';
import { Image } from 'primereact/image';
import { icons } from '../../../resources/constants';
interface itemType {
  link: string;
  image: string;
}

interface CarouselBannerProps {
  data: itemType[];
}

const CarouselBanner = ({ data }: CarouselBannerProps) => {
  const itemCarousel = (item: itemType) => {
    const redirectToExternalLink = (item: string) => {
      if (item?.link) {
        const newTab = window.open(`https://${item?.link}`, '_blank');
        newTab?.focus();
      }
    };
    return (
      <div>
        <img
          src={item.image}
          alt="Image"
          preview
          width="100%"
          height="275"
          className="imageCarousel"
        />
      </div>
    );
  };
  return (
    <Fragment>
      <Carousel
        value={data}
        numScroll={1}
        numVisible={1}
        itemTemplate={itemCarousel}
        indicatorsContentClassName="carousel-banner-indicateur"
        containerClassName="carousel-banner-container"
        contentClassName="carousel-banner-content"
        nextIcon={
          <img
            src={icons.arrow}
            height={10}
            width={6}
            className="carousel-banner-next"
          />
        }
        prevIcon={
          <img
            src={icons.arrow}
            height={10}
            width={6}
            className="carousel-banner-prev"
          />
        }
        autoplayInterval={15000}
        showNavigators={false}
      />
    </Fragment>
  );
};

export default CarouselBanner;
