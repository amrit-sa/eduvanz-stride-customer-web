import React, { useEffect, useState } from 'react'
import { getTnC } from '../actions/user'
import { connect } from 'react-redux';

const TermsCondition = (props) => {

    const [Tnc, setTnc] = useState({});
    
    async function getData() {
       


        props.dispatch(getTnC()).then((response) => {
            if (Object.keys(Tnc).length == 0 && response.data.length > 0) {
                let obj = response.data[0]
                console.log(response)

                setTnc(obj)

            }
        })
    }



    useEffect(() => {
        if (Object.keys(Tnc).length == 0) {
            getData();
        }
    }, [Tnc])

    const border_style = {
        boxShadow: "0px 2px 11px 0px #dbd6e7",
        borderRadius: "30px"
    }
    return (
        <div className="container  " >

            <div className=' col-md-12 col-sm-6 p-3 mt-4' style={border_style}>
                <h2 className='text-center mb-4'>Terms & Conditions</h2>

                <ul>
                    {   
                    
                        
                                <>
                    
                                    <li>
                                        <p className='fs-4'>
                                            {Tnc.body}
                                        </p>
                                    </li>
                                </>
                        
                    }
                   
                </ul>




            </div>
        </div>
    )
}

export default connect()(TermsCondition)