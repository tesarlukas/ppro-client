import React from 'react';
import '../styles/App.css';
import '../components/TextField';
import { Carousel } from 'flowbite-react';

const Home: React.FC = () => {
    return (
        <>
            <div className="sm:h-64 xl:h-80 2xl:h-96 ">
                <Carousel className="rounded-none">
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                        alt="..."
                    />
                </Carousel>
            </div>
        </>
    );
};

export default Home;
