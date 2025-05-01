'use client';

import { getUser } from '@/lib/actions/accounts.actions';
import React, { useEffect, useState } from 'react'

const GreetComp = () => {

    const [greeting, setGreeting] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const loggedDoc = await getUser();
                if (loggedDoc) {
                    setName(loggedDoc.name);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
        const updateWish = () => {
            console.log("Updating wish");
            const hours = new Date().getHours();
            if (hours >= 4 && hours < 12) {
                setGreeting("Good Morning");
            } else if (hours >= 12 && hours < 17) {
                setGreeting("Good Afternoon");
            } else if (hours >= 17 && hours < 21) {
                setGreeting("Good Evening");
            }else {
                setGreeting("Good Night");
            }
        };
        updateWish();
        setInterval(updateWish, 60 * 1000);
    }, []);

    return (
        <div className='flex justify-between'>
            <h1 className='header'>{greeting}! <span className='text-green-500'>Dr. {name}</span></h1>

        </div>
    )
}

export default GreetComp