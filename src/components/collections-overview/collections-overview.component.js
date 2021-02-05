import React from 'react';
import './collection-overview.styles.css';
import CollectionPreview from "../collection-preview/collection-preview.component";
import {createStructuredSelector} from "reselect";
import {selectCollectionForPreview} from "../../redux/shop/shop.selector";
import {connect} from "react-redux";


const CollectionOverview = ({collections}) => {
    return (
        <div className={'collections-overview'}>
            {collections.map(({id, ...otherCollectionProps})=>(
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))}
        </div>
    );
};

const mapStateToProps=createStructuredSelector({
    collections: selectCollectionForPreview
})
export default connect(mapStateToProps) (CollectionOverview);
