import React, { useState } from 'react';
;
import { useNavigate } from 'react-router-dom';
import { categories } from '../index';
import { COLORS, SIZES, images } from '../../../../../resources/constants';
import { capitalizeFirstLetter } from '../../../../../service/technique/utils';
import { dateToStringMoreAccurate } from '../../../../../data/factory/dateFactory';
import { NEWS_DETAILS } from '../../../../../data/constants/strings';
import Loader from '../../../../components/Loader';
import useNews from './useNews';
import styles from './style';
import { DataView } from 'primereact/dataview';
import { paginatorTemplateCustom } from '../../../../components/PaginatoTemplateCustom';
import { useMobile } from '../../../../../service/hooks/useMobile';
import MiniLoader from '../../../../components/MiniLoader';

const List = ({ lists, category, changeCategory, details, isCliked, loading }: any) => {
    const [click, setClick] = useState(isCliked);
    const { isMobile } = useMobile()
    const getKeyByValue = (object: any, value: string) => {
        const res: any = Object.keys(object).find(key => object[key] === value);
        return res;
    };

    const renderItemTemplate = (list: any, index: number) => (
        <button
            key={index}
            style={styles.container}
            onClick={() => details(list)}>
            <div style={styles.wrapperItem}>
                <div style={styles.wrapperText}>
                    <span style={styles.category}>
                        {capitalizeFirstLetter(
                            getKeyByValue(categories, category),
                        )}
                    </span>
                    <span style={styles.title}>{list?.title}</span>
                    <div>
                        <span style={styles.date}>
                            {dateToStringMoreAccurate(list?.publishedAt)}
                        </span>
                        <span style={styles.source}>{list?.author}</span>
                    </div>
                </div>
                <div style={styles.wrapperImg}>
                    <img
                        src={list?.image ? { uri: list?.image } : images.home}
                        style={styles.itemImg}
                    />
                </div>
            </div>
        </button>
    );

    return (
        <div style={{ justifyContent: 'center' }}>
            <div style={{overflowY: "auto"}}>
                <div
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start'}}>
                    {Object.keys(categories).map((category, index) => (
                        <button
                            style={{...styles.filter, ...(click === index ? styles.itemActive : null)}}
                            onClick={() => {
                                changeCategory(categories[category]), setClick(index);
                            }}
                            key={index}>
                            <span
                                style={{
                                    marginHorizontal: 3,
                                    color: click === index ? COLORS.primary : COLORS.black,
                                    fontWeight: 'bold'}}>
                                {category}
                            </span>
                        </button>
                    ))}
                </div>
                <div>
                    {
                        loading ?
                            <div style={{minHeight:400}}>
                                <MiniLoader/>
                            </div>
                            :
                            lists.length ? (isMobile ?
                                <DataView value={lists} layout="list" itemTemplate={renderItemTemplate} />
                                :
                                <DataView value={lists} layout="list" itemTemplate={renderItemTemplate} paginatorTemplate={paginatorTemplateCustom} paginator rows={3} />)
                                : (
                                    <div style={styles.noResultFoundContainer}>
                                        <span style={styles.noResultFoundText}>
                                            {NEWS_DETAILS.NO_RESULT_FOUND}
                                        </span>
                                    </div>
                                )}
                </div>
            </div>
        </div>
    );
};

const NewsList = (props: any) => {
    const navigate = useNavigate();

    const [category, setCategory] = useState(
        props.category || 'general',
    );

    const { newsList, isLoading } = useNews(category);

    const changeCategory = (category: string) => setCategory(category);

    const handleDetails = value =>
        navigate('/NewsInformationScreen', { state: { info: value } });

    return (
        <div>
            <div
                style={{
                    padding: SIZES.padding,
                    marginBottom: SIZES.padding,
                    paddingLeft: 0,
                    paddingRight: 0}}>
                <div style={{ marginTop: 10 }}>
                    <List
                        lists={newsList}
                        category={category}
                        changeCategory={changeCategory}
                        details={handleDetails}
                        isCliked={props.isCliked}
                        loading={isLoading}
                    />
                </div>
            </div>
            {/* {isLoading ? <Loader /> : null} */}
        </div>
    );
};

export default NewsList;
