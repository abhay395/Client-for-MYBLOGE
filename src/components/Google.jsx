import React, { useEffect } from 'react';

const GoogleLoginButton = () => {
    const handleSignIn = () => {
        const clientId = '793610745077-ca82ih62k2qbljrf006t9alc74d1ksvt.apps.googleusercontent.com';
        const redirectUri = 'http://localhost:3000'; // Should be set up in your Google Developer Console

        const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email`;

        window.location.href = authUrl;
    };

    return (
        <button className='bg-blue-500' onClick={handleSignIn}>
            Sign In with Google
        </button>
    );
};

export default GoogleLoginButton;
