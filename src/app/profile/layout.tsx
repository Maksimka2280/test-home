'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import SideMenu from '@/components/shared/SideMenu/SideMenu';
import Highlight from './Highlight/page';
import SettingsProfile from './settingsProfile/page';
import SubscribePage from './SubscribePage/page';
import Notifications from './Notifications/page';
import SaveSearch from './SaveSearch/page';
import Comments from './page';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('important');

  // следим за изменением параметра tab в URL
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  // обновляем URL при смене вкладки вручную
  useEffect(() => {
    router.replace(`?tab=${activeTab}`);
  }, [activeTab]);

  return (
    <div className="flex w-full max-w-[1380px] 2xl:max-w-[1800px] mx-auto min-h-screen">
      <SideMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">{renderTabContent(activeTab)}</main>
    </div>
  );
}

const renderTabContent = (activeTab: string) => {
  switch (activeTab) {
    case 'important':
      return <Highlight />;
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
