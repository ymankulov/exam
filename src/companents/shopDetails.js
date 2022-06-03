import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToBasket, getCategoryList, getProdDetail, getProdList} from "../redux/action/action";
import {faBagShopping, faCheck, faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BooksCard from "./card/booksCard";
import CategoryCartBooks from "./card/categoryCartBooks";
import Slider from "react-slick";
import Modal from "./Modal";

const ShopDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {shopProductDetail: prodDetail} = useSelector(s => s)
    const {shopProductList: product} = useSelector(s => s)
    const {shopListCategory: category} = useSelector(s => s)
    const {basket: el} = useSelector(s => s)
    category.some(el => el.id === prodDetail.category ? console.log(el.title): "aa" )
    console.log(el)

    const {basket} = useSelector(s => s)
    const basketItems = basket.some(basket => basket.id === prodDetail.id)

    useEffect(() => {
        dispatch(getCategoryList())
        dispatch(getProdDetail(id))
        dispatch(getProdList())
    }, [])

    const categorySettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const [modalActive, setModalActive] = useState(true)


    return (
        <div className="container mx-auto">
            <div className="flex flex-row mt-9 pb-20">
                <div className="basis-1/4">
                    <img src={prodDetail.image}
                         className="w-96 h-[100%] object-cover rounded-md "/>
                </div>
                <div className="basis-1/2 text-left ml-10">
                    <p className="w-full">{prodDetail.description}</p>
                    <h1 className="text-3xl font-medium w-9/12">{prodDetail.title}</h1>
                    <p className="text-xl font-medium w-9/12">{prodDetail.price} сом</p>
                    <div className="flex ">
                        Жанры : {category.map(el => (
                        <p className="ml-5">{el.id === prodDetail.category ? el.title : ""}</p>))}
                    </div>
                    <div className="flex flex-col w-80">
                        {
                            basketItems ? <button
                                className="bg-blue-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded my-4">
                                <FontAwesomeIcon icon={faCheck}/>Добавлено</button> : <button
                                className="bg-gray-200 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded my-4 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
                                onClick={() => dispatch(addToBasket(prodDetail))}
                            ><FontAwesomeIcon icon={faBagShopping}/> добавить в корзину</button>
                        }
                            <button  onClick={() => setModalActive(true)} className="bg-gray-200 hover:bg-gray-600 text-black font-bold py-2 px-4 rounded my-4 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
                            >Купить сейчас</button>

                            <Modal active={modalActive} setActive={setModalActive}>
                                     <p></p>
                            </Modal>
                    </div>
                </div>
            </div>

            <h1 className="sm:text-center md:text-center lg:text-left xl:text-left text-3xl w-full text-black py-5 font-bold">Возможно, Вам понравится</h1>

            <Slider
                {...categorySettings}>
                {
                    product.map(el => (
                        <div key={el.id}>
                            <BooksCard el={el} />
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
};

export default ShopDetails;