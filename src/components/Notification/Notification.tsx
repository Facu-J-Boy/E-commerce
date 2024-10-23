import { useEffect } from 'react';
import styles from './Notification.module.css';
import { VscError, VscPass } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  clearNotification,
  notificationState
} from '../../redux/reducers/notificationReducer';

const Notification: React.FC<notificationState> = ({
  type,
  text
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
  });

  const notificationStyle = {
    backgroundColor: type === 'success' ? 'green' : '#cf010b'
  };

  return (
    <div className={styles.notification} style={notificationStyle}>
      <>{type === 'success' ? <VscPass size={50} /> : <VscError size={50} />}</>
      <p>{text}</p>
    </div>
  );
};

export default Notification;
