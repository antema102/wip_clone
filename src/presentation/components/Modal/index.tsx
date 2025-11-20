import React from 'react';
import { Dialog } from 'primereact/dialog';

interface ModalProps {
  visible?: boolean;
  setVisible?: any;
  footerContent?: any;
  title?: string;
  content?: JSX.Element | any;
  position?:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | undefined;
  maximizable?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  showHeader?: boolean;
  dismissableMask?: boolean;
  width?: string;
  maxHeight?: string;
  isEditable?: boolean;
}

const CustomModal = ({
  visible,
  setVisible,
  footerContent,
  title,
  content,
  maximizable = false,
  resizable = false,
  draggable = false,
  position = 'center',
  showHeader = true,
  dismissableMask = true,
  width = '75w',
  maxHeight = 'auto',
  isEditable = false,
}: ModalProps) => {
  return (
    <Dialog
      header={title && title}
      visible={visible}
      position={position}
      resizable={resizable}
      maximizable={maximizable}
      draggable={draggable}
      dismissableMask={dismissableMask}
      showHeader={showHeader}
      style={{ width, maxHeight }}
      footer={footerContent && footerContent}
      onHide={() => (isEditable ? null : setVisible(!visible))}
    >
      {content && content}
    </Dialog>
  );
};

export default CustomModal;
