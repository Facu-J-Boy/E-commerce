import { useEffect } from 'react';
import styles from './Notification.module.css';
import { VscError } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { clearNotification } from '../../redux/reducers/notificationReducer';

const Notification: React.FC<{ text: string }> = ({ text }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
  });

  return (
    <div className={styles.notification}>
      <>
        <VscError size={'50px'} />
      </>
      <p>{text}</p>
    </div>
  );
};

export default Notification;
