import { render } from "@testing-library/react";
import React from "react";

export const getMidLongProduct = (product_mid,product_long)=>{
    //console.log(product_mid,product_long,"product_mid,product_long")
    //keys : name , nocost emi to-do,brand_icon, image_url__c
    
//     productDetail(category) {
//         window.location = "/products-list?category="+category
//        // window.location = '/product-details/' + pid
//        // this.props.pushPage('/product-details/' + pid)
//    }
    return (
        <>
            <div className="item one">
                <button className="wish"><i className="fa fa-heart-o"
                                            aria-hidden="true"></i></button>

                <div className="top">
                    <p>{product_mid.name.slice(0, 20)}</p>
                    <h4>
                        No Cost EMI Starting
                        <span className="d-block mb-4">₹{product_mid.price__c} </span>
                    </h4>
                    <button className="brand_icon">
                        <img src={product_mid.brand_icon}
                             className="img-fluid"/>
                    </button>
                </div>
                <div className="img-box">
                    <img src={product_mid.image_url__c} className="img-fluid" onClick={()=>window.location = '/product-details/' + product_mid.sfid}/>
                </div>
            </div>
            {product_long && <div className="item two">
                <button className="wish"><i className="fa fa-heart-o"
                                            aria-hidden="true"></i></button>

                <div className="top">
                    <p>{product_long.name.slice(0, 20)}</p>
                    <h4>
                        No Cost EMI
                        <span className="d-block mb-3">Starting ₹{product_long.price__c} </span>
                    </h4>
                    <button className="brand_icon">
                        <img src={product_long.brand_icon}
                             className="img-fluid" onClick={()=>window.location = '/product-details/' + product_mid.sfid}/>
                    </button>
                </div>
                <div className="img-box">
                    <img src={product_long.image_url__c} className="img-fluid" onClick={()=>window.location = '/product-details/' + product_mid.sfid}/>
                </div>
            </div>}
        </>
    )
}

export const getLongSmallSmallProduct = (product_long,product_small1,product_small2)=>{
    //keys : name , nocost emi to-do,brand_icon, image_url__c

    return (
        <>
            <div className="item three">
                <button className="wish">
                    <i className="fa fa-heart-o"
                                            aria-hidden="true"></i></button>

                <div className="top">
                    <p>{product_long.name.slice(0, 20)}</p>
                    <h4>
                        No Cost EMI Starting
                        <span className="d-block mb-4">₹{product_long.price__c} </span>
                    </h4>
                    <button className="brand_icon"><img src={product_long.brand_icon}
                                                        className="img-fluid" onClick={()=>window.location = '/product-details/' + product_long.sfid}/></button>
                </div>
                <div className="img-box">
                    <img src={product_long.image_url__c} className="img-fluid" onClick={()=>window.location = '/product-details/' + product_long.sfid}/>
                </div>
            </div>
            {product_small1 && <div className="four">
                <div className="row">
                    <div className="col-6">
                        <div className="item five">
                            <button className="wish"><i className="fa fa-heart-o"
                                                        aria-hidden="true"></i></button>

                            <div className="top">
                                <p>{product_small1.name.slice(0, 20)}</p>
                                <h4>
                                    No Cost EMI
                                    <span
                                        className="d-block mb-3">Starting ₹{product_small1.price__c} </span>
                                </h4>
                                <button className="brand_icon"><img src={product_small1.brand_icon}
                                                                    className="img-fluid" onClick={()=>window.location = '/product-details/' + product_small1.sfid}/>
                                </button>
                            </div>
                            <div className="img-box">
                                <img src={product_small1.image_url__c} className="img-fluid" onClick={()=>window.location = '/product-details/' + product_small1.sfid}/>

                            </div>
                        </div>

                    </div>
                    {product_small2 && <div className="col-6">
                        <div className="item six">
                            <button className="wish"><i className="fa fa-heart-o"
                                                        aria-hidden="true"></i></button>

                            <div className="top">
                                <p>{product_small2.name.slice(0, 20)}</p>
                                <h4>
                                    No Cost EMI
                                    <span
                                        className="d-block mb-3">Starting ₹{product_small2.price__c} </span>
                                </h4>
                                <button className="brand_icon"><img src={product_small2.brand_icon}
                                                                    className="img-fluid" onClick={()=>window.location = '/product-details/' + product_small2.sfid}/></button>
                            </div>
                            <div className="img-box">
                                <img src={product_small2.image_url__c} className="img-fluid" onClick={()=>window.location = '/product-details/' + product_small2.sfid}/>

                            </div>
                        </div>

                    </div>}
                </div>
            </div>}
        </>
    )
}

export const getLargeProduct = (product_large)=>{
    //keys : name , nocost emi to-do,brand_icon, image_url__c

    return (
        <>
            <div className="item saven">
                <button className="wish"><i className="fa fa-heart-o"
                                            aria-hidden="true"></i></button>


                <div className="top">
                    <p>{product_large.name.slice(0, 20)}</p>
                    <h4>
                        No Cost EMI Starting
                        <span className="d-block mb-4">₹{product_large.price__c} </span>
                    </h4>
                    <button className="brand_icon" onClick={()=>window.location = '/product-details/' + product_large.sfid}>{product_large.brand_icon}</button>
                </div>
                <div className="img-box">
                    <img src={product_large.image_url__c} className="img-fluid" onClick={()=>window.location = '/product-details/' + product_large.sfid}/>
                </div>

            </div>
        </>
    )
}

export const getProductsJSX = (products) =>{
    console.log('productsproductsproducts',JSON.stringify(products))
    let current_layout_type = 0
    let skip_next = 0
    
    return products.map((item,index)=> {
        if(skip_next > 0){
            skip_next--;
            return <div key={Math.random()*10000}></div>
        }
        else if(products[index] && current_layout_type===0){
            skip_next = 1
            current_layout_type+=1
            return <li key={products[index].id}>{getMidLongProduct(products[index], products[index + 1])}</li>
        }
        else if(products[index] && current_layout_type===1){
            skip_next = 2
            current_layout_type+=1
            return <li key={products[index].id}>{getLongSmallSmallProduct(products[index], products[index + 1], products[index + 2])}</li>
        }
        else if(products[index] && current_layout_type===2){
            skip_next = 0
            current_layout_type=0
            return <li key={products[index].id}>{getLargeProduct(products[index])}</li>
        }
    })
}