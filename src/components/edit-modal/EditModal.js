import React , {useState , useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import { editWooProduct } from '../../store/actions/';
import {    
    Grid , 
    TextField , 
    FormControlLabel , 
    Switch } from '@material-ui/core';

import ButtonUploadImage from '../../components/button-upload/ButtonUpload'; 
import EditableImage from '../../components/editable-image/EditableImage';
import { Link , Redirect } from "react-router-dom";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const MaxWidthDialog = ({dispatch  , EDITING_WOO_PRODUCT}) => {

    const [productId,setProductId]                      = useState(0);
    const [regularPrice,setRegularPrice]                = useState(0);
    const [published,setPublished]                      = useState(false);
    const [salePrice,setSalePrice]                      = useState(0);
    const [productName,setProductName]                  = useState("");
    const [productThumbnail,setProductThumbnail]        = useState(false);
    const [productDescription,setProductDescription]    = useState("");

    useEffect(() => {
        if(EDITING_WOO_PRODUCT.currentProduct){
            let regularPrice    = EDITING_WOO_PRODUCT.currentProduct.regular_price;
            let salePrice       = EDITING_WOO_PRODUCT.currentProduct.sale_price.length ;
    
            setProductId(EDITING_WOO_PRODUCT.currentProduct.id);
            setRegularPrice(regularPrice);
            setSalePrice(salePrice);
            setProductName(EDITING_WOO_PRODUCT.currentProduct.name);
            setProductThumbnail(EDITING_WOO_PRODUCT.currentProduct.images[0].src);
            setProductDescription(EDITING_WOO_PRODUCT.currentProduct.description);
            setPublished((EDITING_WOO_PRODUCT.currentProduct.status === 'publish'))
             // ADD THE OVERFLOW HIDDEN 
             document.body.classList.add('overflow-hidden');
        }   
    },[EDITING_WOO_PRODUCT]);

    const handleClose = () => {
        document.body.classList.remove('overflow-hidden');
        dispatch(editWooProduct(false));
    };
    
    const handleClickAdvanced = () => {
        dispatch(editWooProduct(false)); 
        return (<Redirect to={`/edit-produit/${productId}`} />)
    }

    return (
        <>
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={EDITING_WOO_PRODUCT.status}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
            scroll="body"
        >
            <MuiDialogTitle disableTypography >
                <Typography variant="h6">
                    Edit [ { productName } ]
                </Typography>
                {/* Redirect */}
                <Button variant="outlined" color="secondary" className="modal-button" onClick={ handleClose }>
                    <Link to={`/edit-produit/${productId}`}>
                        Advanced Edit 
                    </Link>
                </Button>
            </MuiDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                            <TextField
                                id="product-name"
                                label="Product Name"
                                className="default-input"
                                variant="outlined"
                                margin="normal"
                                value={productName} 
                            />
                            <TextField
                                id="regular-price"
                                label="Regular Price"
                                className="default-input"
                                variant="outlined"
                                margin="normal"
                                value={regularPrice}
                            />
                            <TextField
                                id="sales-price"
                                label="Sales Price"
                                className="default-input"
                                variant="outlined"
                                margin="normal"
                                value={salePrice}
                            />
                            <TextField
                                id="product-description"
                                label="Short Product Description"
                                className="default-wysiwyg" 
                                margin="normal"
                                variant="outlined"
                                multiline
                                rows="8"
                                value={productDescription}
                            />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className="featured-image">
                                { productThumbnail  ? <EditableImage imageObject={productThumbnail} removeImageFunc={() => setProductThumbnail(false)} /> 
                                                : <ButtonUploadImage typeImage="thumbnail" onChange ={ (thumbnail) => setProductThumbnail(thumbnail.target.files[0]) } /> }
                        </div>  
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={published}
                                    onChange={() => setPublished(!published)}
                                    value="published"
                                    color="primary"
                                />
                            }
                            label="Published"
                        />
                    </Grid>
                </Grid> 
            </DialogContent>
        </Dialog>
        </>
    );
}

const mapStateToProps = ({ EDITING_WOO_PRODUCT }) => ({ EDITING_WOO_PRODUCT});

export default connect(mapStateToProps)(MaxWidthDialog);