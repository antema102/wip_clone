import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity
            key={index}
            style={styles.container}
            onPress={() => details(list)}>
            <View style={styles.wrapperItem}>
                <View style={styles.wrapperText}>
                    <Text style={styles.category}>
                        {capitalizeFirstLetter(
                            getKeyByValue(categories, category),
                        )}
                    </Text>
                    <Text style={styles.title}>{list?.title}</Text>
                    <View>
                        <Text style={styles.date}>
                            {dateToStringMoreAccurate(list?.publishedAt)}
                        </Text>
                        <Text style={styles.source}>{list?.author}</Text>
                    </View>
                </View>
                <View style={styles.wrapperImg}>
                    <Image
                        source={list?.image ? { uri: list?.image } : images.home}
                        style={styles.itemImg}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ justifyContent: 'center' }}>
            <ScrollView>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                    }}>
                    {Object.keys(categories).map((category, index) => (
                        <TouchableOpacity
                            style={[
                                styles.filter,
                                click === index ? styles.itemActive : null,
                            ]}
                            onPress={() => {
                                changeCategory(categories[category]), setClick(index);
                            }}
                            key={index}>
                            <Text
                                style={{
                                    marginHorizontal: 3,
                                    color: click === index ? COLORS.primary : COLORS.black,
                                    fontWeight: 'bold',
                                }}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View>
                    {
                        loading ?
                            <View style={{minHeight:400}}>
                                <MiniLoader/>
                            </View>
                            :
                            lists.length ? (isMobile ?
                                <DataView value={lists} layout="list" itemTemplate={renderItemTemplate} />
                                :
                                <DataView value={lists} layout="list" itemTemplate={renderItemTemplate} paginatorTemplate={paginatorTemplateCustom} paginator rows={3} />)
                                : (
                                    <View style={styles.noResultFoundContainer}>
                                        <Text style={styles.noResultFoundText}>
                                            {NEWS_DETAILS.NO_RESULT_FOUND}
                                        </Text>
                                    </View>
                                )}
                </View>
            </ScrollView>
        </View>
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
        <View>
            <View
                style={{
                    padding: SIZES.padding,
                    marginBottom: SIZES.padding,
                    paddingLeft: 0,
                    paddingRight: 0,
                }}>
                <View style={{ marginTop: 10 }}>
                    <List
                        lists={newsList}
                        category={category}
                        changeCategory={changeCategory}
                        details={handleDetails}
                        isCliked={props.isCliked}
                        loading={isLoading}
                    />
                </View>
            </View>
            {/* {isLoading ? <Loader /> : null} */}
        </View>
    );
};

export default NewsList;
