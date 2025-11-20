import React, { Fragment } from 'react';
;
import { Image } from 'primereact/image';
import { Carousel } from 'primereact/carousel';
import { styles } from './styles';
import './styles.css';

interface Props {
  data: any;
}

interface itemTemplateType {
  link: string,
  image: string}

const Banner = {
  data
}: Props) => {
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];


  const itemTemplate = (item: itemTemplateType) => {
    const redirectToExternalLink = (item: any) => {
      if (item?.link) {
        const newTab = window.open(`https://${item?.link}`, '_blank');
        newTab?.focus();
      }
    };

    return (
      <Fragment>
        <div>
          <div style={styles.Logo}>
            <img src={item.image} alt="Image" preview width="200" height='200' />
          </div>
        </div>
        <div style={styles.separator}></div>
        {item?.link ? <div style={styles.centerElement}>
          <button
            style={styles.linkView}
            onClick={() => redirectToExternalLink(item)}>
            <span style={styles.text}>Voir le lien</span>
          </button>
        </div> : null}
      </Fragment>
    );
  };
  return (
    <div style={styles.container}>
      <Carousel value={data} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
        autoplayInterval={30000} itemTemplate={itemTemplate} showNavigators={false} showIndicators={true} contentClassName="custom-carousel-container" />
    </div>
  );
};

export default Banner;