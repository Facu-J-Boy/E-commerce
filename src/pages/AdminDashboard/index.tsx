import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.myTab} role='tablist'>
        <li className={styles.navItem}>
          <button
            className={`${styles.navLink} ${
              activeTab === 'home' && styles.active
            }`}
            onClick={() => handleTabClick('home')}
            type='button'
            role='tab'
            aria-controls='home-tab-pane'
            aria-selected={activeTab === 'home'}
          >
            Home
          </button>
        </li>
        <li className={styles.navItem}>
          <button
            className={`${styles.navLink} ${
              activeTab === 'profile' && styles.active
            }`}
            onClick={() => handleTabClick('profile')}
            type='button'
            role='tab'
            aria-controls='profile-tab-pane'
            aria-selected={activeTab === 'profile'}
          >
            Profile
          </button>
        </li>
        <li className={styles.navItem}>
          <button
            className={`${styles.navLink} ${
              activeTab === 'contact' && styles.active
            }`}
            onClick={() => handleTabClick('contact')}
            type='button'
            role='tab'
            aria-controls='contact-tab-pane'
            aria-selected={activeTab === 'contact'}
          >
            Contact
          </button>
        </li>
        <li className={styles.navItem}>
          <button
            className={`${styles.navLink} ${
              activeTab === 'disabled' && styles.active
            } ${styles.disabled}`}
            onClick={() => handleTabClick('disabled')}
            type='button'
            role='tab'
            aria-controls='disabled-tab-pane'
            aria-selected={activeTab === 'disabled'}
            disabled
          >
            Disabled
          </button>
        </li>
      </ul>
      <div className={styles.myTabContent}>
        <div
          className={`${styles.tabPane} ${
            activeTab === 'home' && styles.active
          }`}
          role='tabpanel'
        >
          Home Content
        </div>
        <div
          className={`${styles.tabPane} ${
            activeTab === 'profile' && styles.active
          }`}
          role='tabpanel'
        >
          Profile Content
        </div>
        <div
          className={`${styles.tabPane} ${
            activeTab === 'contact' && styles.active
          }`}
          role='tabpanel'
        >
          Contact Content
        </div>
        <div
          className={`${styles.tabPane} ${
            activeTab === 'disabled' && styles.active
          }`}
          role='tabpanel'
        >
          Disabled Content
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
