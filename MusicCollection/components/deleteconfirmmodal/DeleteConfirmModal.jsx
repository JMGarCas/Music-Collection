import {Modal, TouchableOpacity, Text, View} from 'react-native';
import styles from './deleteconfirmmodal.style';
import {useRealm} from '../../schemas/Album';

const DeleteConfirmationModal = ({
  modalOpen,
  albumToDelete,
  changeModalClose,
}) => {
  const realm = useRealm();

  const deleteAlbum = id => {
    const albumToDelete = realm.objectForPrimaryKey('Album', id);
    realm.write(() => {
      realm.delete(albumToDelete);
    });
  };

  return (
    <Modal visible={modalOpen} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <Text style={styles.confirmText}>Are You Sure?</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => {
                changeModalClose();
              }}>
              <Text style={styles.actionBtnText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => {
                deleteAlbum(albumToDelete);
                changeModalClose();
              }}>
              <Text style={styles.actionBtnText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;
