'use client';

import { useState } from 'react';
import SideMenu from '@/components/shared/SideMenu/SideMenu';
import Highlight from './Highlight/page';
import SettingsProfile from './settingsProfile/page';
import SubscribePage from './SubscribePage/page';
import FavoritesLK from './FavoritesLK/page';
import Notifications from './Notifications/pgae';
import SaveSearch from './SaveSearch/page';
import Comments from './Comments/page';
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('important');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'important':
        return <Highlight />;
      case 'favorites':
        return <FavoritesLK />;
      case 'notifications':
        return <Notifications />;
      case 'savedSearches':
        return <SaveSearch />;
      case 'myComments':
        return <Comments />;
      case 'subscription':
        return <SubscribePage />;
      case 'profile':
        return <SettingsProfile />;
      default:
        return <div>Выбери что-нибудь слева</div>;
    }
  };

  return (
    <div className="flex w-full max-w-[1380px] 2xl:max-w-[1800px] mx-auto min-h-screen">
      <SideMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">{renderTabContent()}</main>
    </div>
  );
}
