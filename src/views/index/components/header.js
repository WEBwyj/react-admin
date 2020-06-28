import React, { Fragment } from 'react';
// css
import "./aside.scss";

class LayoutHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Fragment>
               <h1 className="logo"><span>LOGO</span></h1>
            </Fragment>
        )
    }
}

export default LayoutHeader;