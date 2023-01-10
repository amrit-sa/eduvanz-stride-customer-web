import React from "react";
import { asset } from "./assets";
import { getProductByCategory } from "../actions/user";
import { getAllfilter } from "../actions/product";

class Filter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedBrand: [],
            selectedProcess: [],
            selectedColor: [],
            selectedSize: [],
            selectedRam: []
        }
    }

    componentDidMount() {
        let obj = {
            category: this.props.category
        }
        this.props.dispatch(getAllfilter(obj));
    }

    onBrandSelect = (e, value) => {
        let modifiedItem;
        const checked = e.target.checked;
        if (checked) {
          modifiedItem = [...this.state.selectedBrand, value];
        } else {
          modifiedItem = this.state.selectedBrand.filter(s => s !== value);
        }
      //  this.setState({ selectedBrand:  modifiedItem});
        this.setState({
            selectedBrand: modifiedItem
        });
    }

    onProcessorSelect = (e, value) =>{
        let modifiedItem;
        const checked = e.target.checked;
        if (checked) {
          modifiedItem = [...this.state.selectedProcess, value];
        } else {
          modifiedItem = this.state.selectedProcess.filter(s => s !== value);
        }
        this.setState({ selectedProcess: modifiedItem});
    }

    onColorSelect = (e, value) =>{
        let modifiedItem;
        const checked = e.target.checked;
        if (checked) {
          modifiedItem = [...this.state.selectedColor, value];
        } else {
          modifiedItem = this.state.selectedColor.filter(s => s !== value);
        }
        this.setState({ selectedColor: modifiedItem});
    }

    onSizeSelect = (e, value) =>{
        let modifiedItem;
        const checked = e.target.checked;
        if (checked) {
          modifiedItem = [...this.state.selectedSize, value];
        } else {
          modifiedItem = this.state.selectedSize.filter(s => s !== value);
        }
        this.setState({ selectedSize: modifiedItem});
    }

    onRamSelect = (e, value) =>{
        let modifiedItem;
        const checked = e.target.checked;
        if (checked) {
          modifiedItem = [...this.state.selectedRam, value];
        } else {
          modifiedItem = this.state.selectedRam.filter(s => s !== value);
        }
        this.setState({ selectedRam: modifiedItem});
    }

    handleFilter = () =>{
        const { sfid } = this.props
        const { page, selectedBrand, selectedColor, selectedProcess, selectedRam, selectedSize} = this.state
        let data = {
            category: this.props.category,
            user_sfid: sfid,
            page: page
        }
        if(selectedBrand && selectedBrand.length > 0)
        {
            data.brands = selectedBrand;
        }
        if(selectedColor && selectedColor.length > 0)
        {
            data.color = selectedColor;
        }
        if(selectedProcess && selectedProcess.length > 0)
        {
            data.processor = selectedProcess;
        }
        if(selectedRam && selectedRam.length > 0)
        {
            data.ram = selectedRam;
        }
        if(selectedSize && selectedSize.length > 0)
        {
            data.size = selectedSize;
        }
        this.props.getFilterProduct(data);
    }

    handleFilterClear = () =>{
        this.setState({
            selectedBrand: [],
            selectedColor:[],
            selectedProcess:[],
            selectedRam:[],
            selectedSize:[]
        });
    }

    render() {
        const { all_filter } = this.props
   //     console.log("all_filter", all_filter);
        const { selectedBrand, selectedColor, selectedProcess, selectedRam, selectedSize } = this.state
        const brandDet   = all_filter && all_filter.brand?all_filter.brand:null;
        const colorDet   = all_filter && all_filter.color?all_filter.color:null;
        const ramDet     = all_filter && all_filter.ram?all_filter.ram:null;
        const processDet = all_filter && all_filter.processor?all_filter.processor:null;
        const sizeDet    = all_filter && all_filter.size?all_filter.size:null;
        return (
            <div className="modal right fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                <div className="modal-dialog filter_all" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4>Filters</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <img src={asset+"images/icons/icon-close2.png"} alt="upgard" className="img-fluid" />
                            </button>

                        </div>

                        <div className="modal-body">
                            <div className="filter_accordion_wrap">
                                <div className="filter_accordion">
                                    <div className="tab">EMI</div>
                                    <div className="content">
                                        <div className="price-range_ p-3" aria-labelledby="dropdownMenuButton">
                                            <div className='d-flex'>
                                                <p className='at'>Amount</p>
                                                <div className='price-box'>
                                                    <input type="text" id="priceAmount" readOnly /></div>
                                            </div>
                                            <div id="price-range"></div>
                                            <ul className='r_l d-flex justify-content-between mt-2'>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                            <ul className='r_l_t d-flex justify-content-between mt-2'>
                                                <li>1000 <span>Min</span></li>
                                                <li>15000</li>
                                                <li className='text-right'>30000<span>Max</span></li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                <div className="filter_accordion">
                                    <div className="tab">Price</div>
                                    <div className="content">Dimension and Weight</div>
                                </div>
                                <div className="filter_accordion">
                                    <div className="tab">Brands</div>
                                    <div className="content">
                                    {brandDet && brandDet.length > 0 && brandDet.map((item, index) =>(
                                        <a key={`brand-filter-brand-item-${index}`} className="dropdown-item cursor-point" href={void(0)}>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id={`drop-fil-brand-${index}`} onChange={ e =>this.onBrandSelect(e, item.sfid)} value={item.sfid} defaultChecked={selectedBrand.includes(item.sfid)} />
                                                <label className="custom-control-label" htmlFor={`drop-fil-brand-${index}`}>{item.name}</label>
                                            </div>
                                        </a>
                                    ))}
                                    </div>
                                </div>
                                <div className="filter_accordion">
                                    <div className="tab">Processor</div>
                                    <div className="content">
                                    {processDet && processDet.length > 0 && processDet.map((item, index) =>(
                                        <a key={`brand-filter-process-item-${index}`} className="dropdown-item cursor-point" href={void(0)}>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id={`drop-flip-process-${index}`} onChange={ e =>this.onProcessorSelect(e, item.processor__c)} value={item.processor__c} defaultChecked={selectedProcess.includes(item.processor__c)} />
                                                <label className="custom-control-label" htmlFor={`drop-flip-process-${index}`}>{item.processor__c}</label>
                                            </div>
                                        </a>
                                    ))}
                                    </div>
                                </div>
                                <div className="filter_accordion">
                                    <div className="tab">Color</div>
                                    <div className="content">
                                    {colorDet && colorDet.length > 0 && colorDet.map((item, index) =>(
                                        <a key={`brand-filter-color-item-${index}`} className="dropdown-item cursor-point" href={void(0)}>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id={`drop-flip-color-${index}`} onChange={ e =>this.onColorSelect(e, item.color__c)} value={item.color__c} defaultChecked={selectedColor.includes(item.color__c)} />
                                                <label className="custom-control-label" htmlFor={`drop-flip-color-${index}`}>{item.color__c}</label>
                                            </div>
                                        </a>
                                    ))}
                                    </div>
                                </div>
                                <div className="filter_accordion">
                                    <div className="tab">Display Size</div>
                                    <div className="content">
                                    {sizeDet && sizeDet.length > 0 && sizeDet.map((item, index) =>(
                                        <a key={`brand-filter-size-item-${index}`} className="dropdown-item cursor-point" href={void(0)}>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id={`drop-flip-size-${index}`} onChange={ e =>this.onSizeSelect(e, item.screen_size__c)} value={item.screen_size__c} defaultChecked={selectedSize.includes(item.screen_size__c)} />
                                                <label className="custom-control-label" htmlFor={`drop-flip-size-${index}`}>{item.screen_size__c}</label>
                                            </div>
                                        </a>
                                    ))}
                                    </div>
                                </div>
                                <div className="filter_accordion">
                                    <div className="tab">ROM</div>
                                    <div className="content">Wheel and Tyres</div>
                                </div>
                                <div className="filter_accordion">
                                    <div className="tab">RAM</div>
                                    <div className="content">
                                    {ramDet && ramDet.length > 0 && ramDet.map((item, index) =>(
                                        <a key={`brand-filter-ram-item-${index}`} className="dropdown-item cursor-point" href={void(0)}>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id={`drop-fil-ram-${index}`} onChange={ e =>this.onRamSelect(e, item.ram__c)} value={item.ram__c} defaultChecked={selectedRam.includes(item.ram__c)} />
                                                <label className="custom-control-label" htmlFor={`drop-fil-ram-${index}`}>{item.ram__c}</label>
                                            </div>
                                        </a>
                                    ))}
                                    </div>
                                </div>
                            </div>
                            <div className='text-right mt-3'>
                                <button type="button" onClick={this.handleFilterClear} className='link'>Clear All</button>
                                <button data-dismiss="modal" aria-label="Close" type="button" onClick={this.handleFilter} className='apply-btn ml-3'>Apply</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div> 
        )
    }
}

export default Filter;