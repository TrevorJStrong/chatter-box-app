import React, { useEffect, PropsWithChildren } from 'react';
import { Modal, Text } from 'react-native-paper';
import { BackHandler } from 'react-native';

const defaultProps = {};

type MyModalProps = {
  title: any;
  modalVisible: boolean;
  setModalVisible: (boolean: boolean) => void;
  footer?: React.ReactNode;
} & PropsWithChildren &
  typeof defaultProps;

const MyModal = ({
  title,
  children,
  modalVisible,
  footer,
  setModalVisible,
}: MyModalProps) => {
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setModalVisible(false);
    });
  }, []);

  return (
    <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <Text>{title}</Text>
        <Text>{children}</Text>
        <Text>{footer}</Text>
    </Modal>
  );
};

MyModal.defaultProps = defaultProps;

export default MyModal;
