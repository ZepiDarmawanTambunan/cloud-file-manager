import { useSession } from 'next-auth/react'
import React from 'react'
import UserInfo from './UserInfo';
import StorageInfo from './StorageInfo';
import StorageDetailsList from './StorageDetailsList';
import StorageUpgradeMsg from './StorageUpgradeMsg';

function Storage() {
    const {data:session} = useSession();

  return session&&(
    <div>
        <UserInfo/>
        <StorageInfo/>
        <StorageDetailsList/>
        <StorageUpgradeMsg/>
    </div>
  )
}

export default Storage