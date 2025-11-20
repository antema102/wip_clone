import React, { Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from "./styles"
import { Company } from '../../../../components/SearchEntResult/Company';
import { SEARCHENT_RESULT } from '../../../../../data/constants/strings';
import { DataView } from 'primereact/dataview';
import { Divider } from 'primereact/divider';
import { paginatorTemplateCustom } from '../../../../components/PaginatoTemplateCustom';
import { useMobile } from '../../../../../service/hooks/useMobile';
import { COLORS } from '../../../../../resources/constants';
import { images } from '../../../../../resources/constants';
export const ListCompany = ({ displayCandidateDetail, data, isMobile }) => {
  const dataList = data;
  const renderItemTemplate = (item: any) => (
    <Fragment>
      <Company
        key={item?.id}
        item={item}
        displayCandidateDetail={displayCandidateDetail}
      />
      <Divider type={'dashed'} />
    </Fragment>);

  const paginator = {
    paginator: true,
    rows: 4,
    totalRecords: dataList.length,
  };

  return (
    <View>
      {/** Listes des candidtas */}
      <View style={{ flex: 1 }}>

        {dataList?.length ?
          // dataList.map(item => (
          //   <Company
          //     key={item?.id}
          //     item={item}
          //     displayCandidateDetail={displayCandidateDetail}
          //   />
          // )) 

          <>
            <View style={{ paddingBottom: 28 }}>
              <Text style={{ fontSize: 15, fontWeight: '700' }}>Profil trouvé :</Text>
            </View>

            {
            !isMobile ? (
              <DataView
                value={dataList}
                layout="list"
                itemTemplate={renderItemTemplate}
                paginatorTemplate={paginatorTemplateCustom}
                {...(dataList.length > 4 ? paginator : {})}
              />
            ) : (
              <DataView
                value={dataList}
                layout="list"
                itemTemplate={renderItemTemplate}
              />
            )
            }
          </>
          :
          <View style={styles.contentResultContainer}>
            <View style={styles.contentTitle}>
              <Text style={styles.title}>
                {
                  SEARCHENT_RESULT.FIND_COMPANY_THAT_ARE_HIRING
                }
              </Text>
            </View>

            <View style={{ alignItems: 'center', gap: 24, paddingTop: 34 }}>
              <View style={{ paddingVertical: 18, paddingHorizontal: 32, backgroundColor: COLORS.blue_title, minWidth: 300, borderRadius: 20 }}>
                <Text style={styles.contentResult}>{SEARCHENT_RESULT.NO_RESULT_FOUND}</Text>
              </View>

              <View style={{ alignItems: 'center', }}>
                <Divider type='solid' align='center' style={{ width: 100 }} />
                <Image source={{ uri: images.hands }} style={styles.image} />
              </View>

            </View>
          </View>
        }
      </View>

    </View>
  );
};
