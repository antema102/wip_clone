import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TEXT_INFORMATIONS } from '../../../../data/constants/strings';
import Popup from '../../../components/CreateCV/Popup';
import { Dialog } from 'primereact/dialog';


type PdfViewerProps = {
  visible?: boolean,
  setVisible?: any,
  footerContent?: any,
  title?: string,
  data?: any,
  position?: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | undefined,
  maximizable?: boolean,
  draggable?: boolean,
  resizable?:boolean
  isDownloadAllowed?:boolean,
  isBlob?:boolean,
}

export const PDFViewerScreen = ({visible, setVisible, footerContent, title, data, maximizable=false, isDownloadAllowed=false, draggable=false, position="center", isBlob}: PdfViewerProps) => {
  const { state } = useLocation();
  const navigation = useNavigate();
  const [popupVisible, setPopupVisible] = React.useState(false);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <Popup
        message={TEXT_INFORMATIONS.FILE_SAVED}
        visible={popupVisible}
        validation={setPopupVisible}
        btnTitle="Ok"
      />
      <Dialog
        header="PDF Viewer"
        visible={visible}
        style={{ width: '60%', height: '100%', top: 20 }}
        modal={true}
        onHide={() => setVisible(false)}
        showHeader={false}
        dismissableMask={true}
        contentStyle={{ overflow: 'hidden', padding: 0, border: 'none', }}
        draggable={true}
      >
        <iframe
        src={isBlob ? data.uri : `data:application/pdf;base64,${data ? data : state?.data}`}
        title="PDF Viewer"
        width="100%"
        height="100%"
        frameBorder={0}
      />
      {(state?.isDownloadAllowed || isDownloadAllowed) && (
        <div
          style={{
            height: 124,
            flex: 1,
            position: 'absolute',
            bottom: 56,
            justifyContent: 'center',
            right: 0,
          }}
        >
          {/* Add download button or UI here */}
        </div>
      )}
      </Dialog>
    </div>
  );
};
