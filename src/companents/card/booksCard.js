import React from 'react';
import {Link} from "react-router-dom";

const BooksCard = ({el}) => {

    return (
        <div className="sm:basis-1  md:basis-1/2 lg:basis-1/3 xl:basis-1/4 my-5 text-center flex justify-center" key={el.id}>
            <div
                className="sm:px-2 py-2  md:px-2 py-3 lg:px-3 py-4 xl:px-4 py-5 text-black bg-white hover:bg-blue-300 px-4 py-4 rounded-md body-font shadow-black bg-black-500 shadow-lg shadow-black-500/100 ">

               <div className="w-full">
                   <Link to={`/shop-details/${el.id}`}>
                       <img src={el.image} alt="image"
                            className="w-full h-96 object-cover rounded-md"/>
                   </Link>
               </div>

                <span className="flex flex-col mt-3">
                    <div className="flex justify-between">
                      <h4 className="font-head font-medium  w-60 text-left">{el.title}</h4>
                        <div className="bg-blue-300 hover:bg-black text-white font-bold py-2 px-4 rounded">
                            <p>{`${el.price} сом`}</p>
                        </div>

                    </div>
                   <div className="font-head font-medium pb-5 w-60 text-left text-xs font-size: 0.75rem line-height: 1rem">
                            {`${el.description} `}</div>

                </span>
            </div>

        </div>
    );
};

export default BooksCard;