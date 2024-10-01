import BasicFields from './../basicFields';

import React from 'react';

const UserSettings =({field, handleSettings})=>{
    return (
        <>
            <BasicFields field={field} setData={handleSettings}/>
        </>
    )
}

export default UserSettings;