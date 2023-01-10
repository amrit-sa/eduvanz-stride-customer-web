import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../helpers/history';
import { asset } from '../common/assets'
class LogoSideBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }
  render() {
    return (
      <>
        <div className="textpart">
          <h4 onClick={() => history.push('/home')} className="mtext-105 cl2 txt-left p-b-30 cursor-point">

            {this.props.color == 'black' ?
              <img
                // className="logo-side-bar"  
                // removed this class to make the logo bigger
                src={`${asset}images/brandlogo-black.png`} alt="Logo" />
              :
              <img class="logo-side-bar" src="images/brandlogo.png" alt="Logo" />

            }

          </h4>
          <h1 className="titfnt">
            <div class="nav-bar-left-side">
              {this.props.sideTitle == 'Back' ?
                <ul className="breadcrumps">
                  <li className="b_back">
                    {this.props.historyGoBack == 'goBack' ?

                      <a href={void (0)} onClick={() => this.props.history.goBack()} >{this.props.sideTitle}</a>
                      :
                      <>
                        <Link to={this.props.backLink}>
                          {this.props.sideTitle}
                        </Link>
                      </>
                    }
                  </li>
                </ul>
                :
                <>
                  <span className="d-block">{this.props.sideTitle}</span>
                </>
              }

              {this.props.breadCrumpPosts &&
                <div className="navigations">
                  <ul className="breadcrumps bread">
                    {this.props.breadCrumpPosts && this.props.breadCrumpPosts.map((post) => (
                      <li>{post.title}</li>
                    )

                    )}
                    {/* <li>{this.props.posts[1].title}</li> */}
                  </ul>
                </div>
              }

            </div>
          </h1>
        </div>
      </>
    )
  }
}

export default LogoSideBar