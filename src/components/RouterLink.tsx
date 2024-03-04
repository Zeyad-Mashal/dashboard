import React from "react";
import {Link} from 'react-router-dom';

const RouterLink = (props:any) => (
    <Link {...props} style={{textDecoration:'none'}}/>
)

export default RouterLink;
