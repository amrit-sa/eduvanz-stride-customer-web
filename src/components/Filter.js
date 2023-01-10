import React, { Component } from "react";
import Slider from "./slider";
import $ from "jquery"


class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            min: '',
            max: '',
            value: [],
            title: null,
            sorting_dir: "Sort"

        }
    }

    componentDidMount() {

        const { category_filters } = this.props;

        // category_filters && category_filters.common.forEach((filters, dataIndex) => (
        // document.querySelector(`[aria-labelledby=${dataIndex}]`).addEventListener('click', (e) => {
        //   e.stopPropagation();
        // })
        // ))



    }

    ltt_toggle = (e, id) => {

        // console.log(e.target)
        $('.filter-box').hide()
        $('.sort-box').hide()

        if ($(e.target).hasClass('d_active')) {
            $(e.target).removeClass('d_active')

            $('.up_dir').hide()
            $('.down_dir').show()

            $("#up" + id).hide()
            $("#down" + id).show()
            $("#" + id).hide()
            $(`#${id}`).removeClass('active')
        } else {
            $('.d_active').removeClass('d_active')
            $(e.target).addClass('d_active')

            $('.up_dir').hide()
            $('.down_dir').show()

            $("#down" + id).hide()
            $("#up" + id).show()
            $("#" + id).show()
            $(`#${id}`).addClass('active')
        }

        // if ($(`#${id}`).hasClass('active')) {

        //     $("#up" + id).hide()
        //     $("#down" + id).show()

        //     $("#" + id).hide()
        //     $(`#${id}`).removeClass('active')
        // } else {
        //     $("#down" + id).hide()
        //     $("#up" + id).show()

        //     $("#" + id).show()
        //     $(`#${id}`).addClass('active')
        // }
        // $('.arrow_down2').toggle();
        // $('.arrow_up2').toggle();
    }


    arr_click = (e) => {
        e.preventDefault()
        e.stopPropagation();

    }

    handleSelectSort = (sort_val, sorting_dir) => {
        this.setState({ sorting_dir: sorting_dir })
        this.props.handleFiltersort(sort_val)

        $('.up_dir').hide()
        $('.down_dir').show()
        
        $("#upsort").hide()
        $("#downsort").show()
        $("#sort").hide()
        $(`#sort`).removeClass('active')
        $('.d_active').removeClass('d_active')
        // $('#sorting_btn').removeClass('d_active')
    }

    render() {
        // console.log('handle compare',this.props.handleCompareEnable);
        const { handleFilter, onFilterSelect, handleFiltersort, category_filters, isCompareEnable, handleCompareEnable } = this.props;
        return (
            <>


                <ul className='search_filter_options m-0'>
                    <li>
                        {/* <button data-toggle="" data-target="#myModal2" className="filter-btn" style={{height:"42px"}}> */}
                        {/* <select id="dropdownMenuButton"
                            onChange={(e) => handleFiltersort(e.target.value)}
                            style={{ border: "none", backgroundColor: "#F4F4F4" }}
                            className="custom-select">
                            <option value="" defaultValue="Sort" >Sort</option>
                            <option value="Descending" >Price-High to Low</option>
                            <option value="Ascending" >Price-Low to High</option>
                            <option value="Newest" >Newest First</option>
                        </select> */}
                        {/* </button> */}


                        <div className="dropdown" >

                            <button
                                id="sorting_btn"
                                className='dropdown filter-btn'
                                type="button"
                                style={{ borderRadius: '50px' }}
                                onClick={(e) => this.ltt_toggle(e, 'sort')}
                            >
                                {this.state.sorting_dir ? this.state.sorting_dir : 'Sort'}
                                <i className="fa fa-angle-down direction down_dir" id={`downsort`} onClick={(e) => this.arr_click(e)}> </i>
                                <i className="fa fa-angle-up direction up_dir" id={`upsort`} style={{ display: "none", }} onClick={(e) => this.arr_click(e)}> </i>
                            </button>



                            <div
                                className="dropdown-menu price-range_ p-3 sort-box"
                                id="sort"
                                style={{ display: "none", minWidth: "max-content" }}
                            >

                                <ul className="pl-0 sort-ul" >
                                    <li className="sorting_li sort-li" onClick={(e) => this.handleSelectSort("Descending", "Price-High to Low")} >Price-High to Low</li>
                                    <li className="sorting_li sort-li" onClick={(e) => this.handleSelectSort("Ascending", "Price-Low to High")}>Price-Low to High</li>
                                    <li className="sorting_li        " onClick={(e) => this.handleSelectSort("Newest", "Newest First")}>Newest First</li>
                                </ul>



                            </div>



                        </div>

                    </li>
                    {category_filters && category_filters.common.map((filters, dataIndex) => (
                        <li key={filters.title + "-" + dataIndex}>
                            <div className="dropdown" >

                                <button
                                    className='dropdown filter-btn'
                                    type="button"
                                    style={{ borderRadius: '50px' }}
                                    onClick={(e) => this.ltt_toggle(e, filters.key)}
                                >
                                    {filters.title}
                                    <i className="fa fa-angle-down direction down_dir" id={`down${filters.key}`} onClick={(e) => this.arr_click(e)}> </i>
                                    <i className="fa fa-angle-up direction up_dir" id={`up${filters.key}`} style={{ display: "none", }} onClick={(e) => this.arr_click(e)}> </i>
                                </button>




                                <div
                                    className="dropdown-menu price-range_ p-3 filter-box"
                                    id={filters.key}
                                    style={{ display: "none" }}
                                >
                                    <div className='d-flex' >
                                        <p className='at'> {(dataIndex == 2) ? 'Percentange' : 'Amount'} </p>

                                    </div>
                                    <div id="slider-range"></div>
                                    <ul className='r_l d-flex justify-content-between mt-2'>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                    <Slider
                                        pearling
                                        minDistance={1}
                                        min={filters.data.min}
                                        max={filters.data.max}
                                        commit={() => handleFilter(1)}

                                        onChange={(value) => onFilterSelect(value, filters.title, dataIndex, 0, filters.type, 'common')}
                                    />
                                    <ul className='r_l_t d-flex justify-content-between mt-2'>
                                        <li>{filters.data.min} {(dataIndex == 2) ? <i className="fa fa-percent"></i> : <i className="fa fa-rupee"></i>} <span>Min</span></li>
                                        <li>{parseInt((filters.data.min + filters.data.max) / 2)}</li>
                                        <li className='text-right'>{filters.data.max} {(dataIndex == 2) ? <i className="fa fa-percent"></i> : <i className="fa fa-rupee"></i>}<span>Max</span></li>
                                    </ul>

                                </div>

                            </div>
                        </li>
                    ))}


                    <li>
                        <button data-toggle="modal" data-target="#myModal2" className="filter-btn">All Filters <i className="fa fa-sliders" aria-hidden="true"></i></button>
                    </li>
                    <li>
                        <button type='button' className={` filter-btn ${isCompareEnable ? "active-btn" : ""}`} onClick={() => handleCompareEnable()} >Compare</button>
                    </li>
                </ul>
            </>
        )
    }

}



export default Filter;