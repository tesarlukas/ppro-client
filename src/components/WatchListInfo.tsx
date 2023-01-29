import React from 'react';
import { Link } from 'react-router-dom';

interface WatchListInfoProps {
    color: string;
    text: string;
    count: number;
    link: string;
}

const WatchListInfo: React.FC<WatchListInfoProps> = (
    props: WatchListInfoProps,
) => {
    return (
        <div className="flex flex-row items-center">
            <div className={`rounded-full ${props.color} w-5 h-5 mr-4`}></div>
            <Link to={props.link} className="text-2xl mr-auto">
                {props.text}
            </Link>
            <h4 className="text-2xl ml-auto">{props.count}</h4>
        </div>
    );
};

export default WatchListInfo;
