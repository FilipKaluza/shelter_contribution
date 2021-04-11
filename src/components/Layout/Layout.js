import React from 'react';

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

import Row from "antd/lib/row"
import Col from "antd/lib/col";

import Dog from "../../assets/images/dog_screen.png"

// import css
import "./Layout.css";

const Layout = (props) => {

    return(
        <>
            <Navbar />
            <Row className="Layout" >
                <Col span={14} >
                    {props.children}
                </Col>
                <Col span={10} className="DogImage">
                    <img src={Dog} alt="DogImage" />
                </Col>
            </Row> 
            <Footer />
        </>
    );
};

export default Layout;