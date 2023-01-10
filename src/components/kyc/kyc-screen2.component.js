import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { incomeUpdate, searchEntity, clearSearchEntity } from "../../actions/user";
import Salaraised from "./salarised.component";
import SelfEmployed from "./self-employed.component";
import Retaired from "./retaired.component";
import { history } from "../../helpers/history";

class KycScreen2 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount()
  {
    const { incomeSource, history } = this.props;
    if(!incomeSource)
    {
      history.push("/ed_salary");
    }
  }

  render() {
    const { incomeSource, isLoading, userMessage, isSuccess } = this.props;
    console.log('this.props.this.props.sub_source',incomeSource)
    return (
     <>
        <Helmet>
            <title>Eduvanz | Income Details</title>
            <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
        </Helmet>
        {isLoading?(
            <div className="loading">Loading&#8230;</div>
        ):''}
        {incomeSource === "Salaried"?
          <Salaraised
          incomeUpdate = {this.props.incomeUpdate}
          incomeSource = {this.props.incomeSource}
          searchEntity = {this.props.searchEntity}
          companyName = {this.props.companyName}
          monthlyIncome = {this.props.monthlyIncome}
          entity = {this.props.entity}
          entitySearch = {this.props.entitySearch}
          clearSearchEntity = {this.props.clearSearchEntity}
          redirectPage = {this.props.redirectPage}
          sfid = {this.props.sfid}
          user = {this.props.user}
          userMessage = {userMessage}
          isSuccess = {isSuccess}
        />:incomeSource === "Students"?
        <Salaraised
            incomeUpdate = {this.props.incomeUpdate}
            incomeSource = {this.props.incomeSource}
            searchEntity = {this.props.searchEntity}
            companyName = {this.props.companyName}
            monthlyIncome = {this.props.monthlyIncome}
            sfid = {this.props.sfid}
            entity = {this.props.entity}
            entitySearch = {this.props.entitySearch}
            clearSearchEntity = {this.props.clearSearchEntity}
            redirectPage = {this.props.redirectPage}
            user = {this.props.user}
            userMessage = {userMessage}
            isSuccess = {isSuccess}
          />:incomeSource === "Self-Employed-Professional"?
          <SelfEmployed
            incomeUpdate={this.props.incomeUpdate}
            incomeSource = {this.props.incomeSource}
            sub_source = {this.props.sub_source}
            companyName = {this.props.companyName}
            monthlyIncome = {this.props.monthlyIncome}
            workAddress = {this.props.workAddress}
            redirectPage = {this.props.redirectPage}
            sfid = {this.props.sfid}
            user={this.props.user}
            userMessage = {userMessage}
            isSuccess = {isSuccess}
          />:incomeSource === "Self-Employed-Non Professional"?
          <SelfEmployed
            incomeUpdate={this.props.incomeUpdate}
            incomeSource = {this.props.incomeSource}
            sub_source = {this.props.sub_source}
            companyName = {this.props.companyName}
            monthlyIncome = {this.props.monthlyIncome}
            workAddress = {this.props.workAddress}
            redirectPage = {this.props.redirectPage}
            sfid = {this.props.sfid}
            user={this.props.user}
            userMessage = {userMessage}
            isSuccess = {isSuccess}
          />:incomeSource ==="Retired"?
          <Retaired
            incomeUpdate={this.props.incomeUpdate}
            incomeSource = {this.props.incomeSource}
            monthlyIncome = {this.props.monthlyIncome}
            sfid = {this.props.sfid}
            user={this.props.user}
            userMessage = {userMessage}
            isSuccess = {isSuccess}
            redirectPage = {this.props.redirectPage}
          />:''
        }
      </>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    incomeUpdate: (data) => {
      dispatch(incomeUpdate(data)).then((resposne) =>{
        if(resposne ==="success")
        {
          history.push("/ed_resident");
        }
      });
    },
    searchEntity: (data) =>{
      dispatch(searchEntity(data));
    },
    clearSearchEntity: () => {
      dispatch(clearSearchEntity())
    },
    redirectPage: (url) =>{
      history.push(url);
    }
 }
}

function mapStateToProps(state) {
  const { message } = state.message;
  const { incomeSource, sub_source, userMessage, isSuccess, entity, entitySearch, companyName, workAddress, monthlyIncome } = state.user;
  const {isLoading, successMsg, errorMsg, isValid, user, token, sfid} = state.auth;
  return {
    message,
    incomeSource,
    entitySearch,
    sub_source,
    isLoading,
    successMsg,
    companyName,
    workAddress,
    monthlyIncome,
    sub_source,
    errorMsg,
    isValid,
    entity,
    sfid,
    user,
    token,
    userMessage, 
    isSuccess
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KycScreen2);
