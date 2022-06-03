import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {addToBasket, DecreaseToBasket, getProdList, RemoveProductBasket} from "../redux/action/action";
import CategoryCartBooks from "./card/categoryCartBooks";
import Slider from "react-slick";
import BooksCard from "./card/booksCard";


const Basket = () => {
    const {basket: el} = useSelector(s => s)
    console.log(el, "ELEMENT")
    const dispatch = useDispatch()

    return (
        <div className="min-h-screen bg-indigo-50 py-5">
            <div className="w-8/12 mx-auto bg-white shadow-lg border rounded-md ">
                {
                    el.length === 0 ? <div className='text-3xl text-center'>Корзина пусто!!!</div> :
                        <div>
                            <div className="w-[80%] mx-auto ">
                                {
                                    el.map((el, idx) => (
                                        <div className="py-3" key={el.id}>

                                            <hr className=" border-1 rounded mb-3"/>

                                            <div className="w-full  flex justify-between pt-5">
                                                <div className="w-[50%] flex justify-between ">
                                                    <img src={el.img} alt="image"
                                                         className="w-6/12 h-72 mr-2 object-cover rounded-md"/>
                                                    <p className="text-md pt-20 font-medium ">{el.name}</p>
                                                </div>
                                                <div className="flex flex-col w-[50%] text-right pr-10">
                                                    <p className="text-md pt-20 pr-16  font-medium">${el.price * el.quantity}</p>
                                                    <span className="text-md pt-5  font-medium">
                                                    <button
                                                        className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                                                        onClick={() => dispatch(addToBasket(el))}>+</button>
                                                    Количество : {el.quantity}
                                                        <button
                                                            className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => dispatch(DecreaseToBasket(idx))}>-</button>
                                                    </span>
                                                    <button
                                                        onClick={() => dispatch(RemoveProductBasket(el.id))}
                                                        className="bg-gray-50 rounded shadow-lg py-3  text-black hover:bg-gray-300 text-md mt-5 ml-48 font-medium">Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="bg-gray-900">

                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Basket;