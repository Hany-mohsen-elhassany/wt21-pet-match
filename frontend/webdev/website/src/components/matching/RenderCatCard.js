import React from "react";
import { Link } from 'react-router-dom';

const RenderCatCard = (props) => {
    //console.log("=========================================");
    //console.log("... begin: RenderCatCard ...");
    //console.log(props);
    let catToShow = props.catToShow;
    if (catToShow.catData === null) {
        return ('');
    }
    let resultArr = props.resultArr;
    let catImage = props.imgPath + catToShow.catData.img;
    let catProfilePage = props.catProfilePage;  
    let filterRecord = props.filterRecord;
    /* 
    console.log("=========================================");
    console.log("... begin: RenderCatCard ...");
    console.log("... end: RenderCatCard ...");
    console.log("=========================================");
    */
    /* check, if user wants the result to be filtered ... by neutered, gender or goodwith: */
    /*    if so, do not render the catCard if filter does not match cat deails */
    if (filterRecord.neutered !== null) {
        if (String(catToShow.catData.neutered) !== String(filterRecord.neutered)) {
            console.log("... FILTER neutered: "+filterRecord.neutered+", "+catToShow.catData.neutered);
            return ('');
        }
    }
    if (filterRecord.gender !== '') {
        if (catToShow.catData.gender !== filterRecord.gender) {
            console.log("... FILTER gender: "+filterRecord.gender+", "+catToShow.catData.gender);
            return ('');
        }
    }
    if (filterRecord.goodwith !== '') {
        if (filterRecord.goodwith === 'likesCats') {
            if (catToShow.catData.likesCats !== true) {
                console.log("... FILTER goodwith - cats: "+filterRecord.goodwith+", "+catToShow.catData.likesCats);
                return ('');
            }
        }
        else {
            if ((catToShow.catData.goodwith === null) || !(catToShow.catData.goodwith.includes(filterRecord.goodwith))) {
                console.log("... FILTER goodwith - text: "+filterRecord.goodwith+", "+catToShow.catData.goodwith);
                return ('');
            }
        }
    }
    /* if cat details fulfill filter criteria or no filter is used ... show cat card ... */
    return (
        <div className="cat_card">
            <div className="img__card">
                <img width="200" height="120" src={catImage} alt={catToShow.catData.alttext} />
            </div>
            <div className="description__card">
                <div className="container__card_title">
                    <h2 className="cat_name">{catToShow.catData.catName}</h2>
                    <div className="a__more_details">
                        <Link to={{ pathname: catProfilePage, state: { resultArr: {resultArr}, catIndex: props.index, filterRecord: props.filterRecord } }} >
                            More Details &#10132;
                        </Link>
                    </div>
                </div>
                <h3 className="cat_gender_age">{catToShow.catData.gender}, {catToShow.catData.age} y.o.</h3>
                <h4 className="cat_shelter">{catToShow.catData.shelterName}</h4>
            </div>
            <div className="a__cat_profile">
                <Link to={{ pathname: catProfilePage, state: { resultArr: {resultArr}, catIndex: props.index, filterRecord: props.filterRecord } }} >
                    <span></span>
                </Link>
            </div>
        </div>
    );
};

export default RenderCatCard;