import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
    },

    {
        title: 'Juegos',
        path: '/juego',
        icon: <FaIcons.FaGamepad />,
        cName: 'nav-text',
    },
    {
        title: 'Perfil',
        path: '/user',
        icon: <FaIcons.FaUser />,
        cName: 'nav-text',
    },
];
