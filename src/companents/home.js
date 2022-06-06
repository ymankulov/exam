import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategoryList, getProdList} from "../redux/action/action";
import BooksCard from "./card/booksCard";
import Slider from "react-slick";
import Bg from "../img/image 112.png"
import CategoryCartBooks from "./card/categoryCartBooks";
import {api} from "../API/api";
import {GET_SHOP_PRODUCT_LIST} from "../redux/type/type";
const Home = () => {
    const dispatch = useDispatch()
    const {shopProductList : product} = useSelector(s => s)
    const {shopListCategory: category} = useSelector(s => s)
    const handleSelect = (e) => {
        api(`/books/?ordering=${e.target.value}`)
            .then(({data}) => {
                dispatch({type:GET_SHOP_PRODUCT_LIST , payload:data})
            })
    }
    useEffect(() =>{
        dispatch(getProdList())
        dispatch(getCategoryList())
    },[])
    //
    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    // };
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
    return (
        <div className="min-h-screen">
            <div className=" w-full">
                <div className="container w-full mx-auto relative ">
                    {/*<Slider*/}
                    {/*    {...settings}>*/}
                    <div className=" ">
                        <img src={Bg} alt=""/>
                    </div>
                    {/*</Slider>*/}
                </div>
            </div>
            <div className=" container mx-auto p-10 flex-col md:flex-row items-center mx-auto ">
                <h1 className="sm:text-center md:text-center lg:text-left xl:text-left text-3xl w-full text-black py-5 font-bold">Категории</h1>
                <div className="w-full bg-white ">
                    <Slider
                        {...categorySettings}>
                        {
                            category.map(el => (
                                <div key={el.id} className="py-2">
                                    <CategoryCartBooks el={el}/>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                <div className="flex justify-between py-5">
                    <h1 className="pl-4 sm:text-center md:text-center lg:text-left xl:text-left text-3xl w-full text-black py-5 font-bold text-[#010049]">Возможно,
                        Вам понравится</h1>
                    <div className="flex justify-center">
                        <div className="w-96 text-[#010049]">
                            <select
                                onChange={(e)=> handleSelect(e)}
                                className="form-select appearance-none
                                    text-[#010049]
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    bg-white bg-clip-padding bg-no-repeat

Murzabek, [06.06.2022 00:25]
border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                <option value="">Сортировка</option>
                                <option value="title">А - Я</option>
                                <option value="-title">Я - A</option>
                                <option value="-price">Дорогие</option>
                                <option value="price">Дешевые</option>
                                <option value="-pub_date">Hoвинки</option>
                            </select>
                        </div>
                        <div>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-wrap justify-between">
                    {
                        product.map(el => (
                            <div key={el.id}>
                                <BooksCard el={el} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
export default Home;