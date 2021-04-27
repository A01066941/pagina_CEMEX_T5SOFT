import React, { useEffect } from 'react';

import { Route } from 'react-router-dom';

const RegularRoute = ({ title, ...rest }) => {
    useEffect(() => {
        document.title = 'CEMEX' + (title === undefined ? '' : ` – ${title}`);
    });

    return <Route {...rest} />;
};

export default RegularRoute;
