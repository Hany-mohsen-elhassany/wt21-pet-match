import React from "react";

const RenderCatTag = (props) => {
    let tagClass = 'tag_' + props.catTag.toLowerCase();
    let actualIndex = props.index + 1;
    /* 
    console.log("=========================================");
    console.log("... begin: RenderCatTag ...");
    console.log("... end: RenderCatTag ...");
    console.log("=========================================");
    */
    return (
        <li key={actualIndex} className={tagClass}>
            {props.catTag}
        </li>
    )
};

export default RenderCatTag;