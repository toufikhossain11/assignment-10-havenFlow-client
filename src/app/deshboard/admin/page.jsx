import AllUsers from '@/components/Deshboard/Admin/AllUsers';
import { getUsers } from '@/lib/homeData/data';
import React from 'react';
async function AllUserComponent() {
  const users = await getUsers();

  return <AllUsers users={users} />
  
}
const adminPage = () => {
    return (
        <div>
            <AllUserComponent/>
        </div>
    );
};

export default adminPage;