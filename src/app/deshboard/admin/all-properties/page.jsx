import AllProperties from '@/components/Deshboard/Admin/AllProperties';
import { getAdminProperties } from '@/lib/homeData/data';
import React from 'react';
// get adminProperties
async function AllPropertiesComponent() {
  const properties = await getAdminProperties();
  return <AllProperties properties={properties} /> 
}
const page = () => {
    return (
        <div>
            <AllPropertiesComponent/>
        </div>
    );
};

export default page;