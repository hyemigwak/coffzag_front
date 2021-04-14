import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import axios from 'axios';
import { history } from "../configureStore";

//actions
const LOADING = "LOADING";
const SET_PRODUCT = "SET_PRORUCT";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({is_loading}));
const setProduct = createAction(SET_PRODUCT, (data) => ({data})); 

//initialState
const initialState = {
    product_list: [],
    is_loading: false,
};

const product_API = "https://run.mocky.io/v3/e43b1027-8246-4ea7-a0d4-8ed73982b308"
const setProductAPI = () => {
    return function(dispatch, getState, {history}){
        dispatch(loading(true));
        axios
        .get(product_API)
        .then((res)=>{
            console.log(res);
            if(res.data.ok){
                dispatch(setProduct(res.data.results));
                dispatch(loading(false));
            }
        })
        .catch((e)=>{
            console.log("setProductAPi 오류", e);
        })
    }
}

const setOneProductAPI = (id) => {
    return function(dispatch, getState, {history}){
        dispatch(loading(true));
        axios
        .get(product_API)
        .then((res) => {
            const product_list = res.data.results;
            const product_idx = product_list.findIndex((p) => p.coffee_id === Number(id));
            const product = product_list[product_idx];
            console.log(product);
            dispatch(setProduct([product]));
            dispatch(loading(false));
        })
        .catch((e)=>console.log("setOneProductAPI 오류", e));
    }
}


//reducer
export default handleActions({
    [LOADING]: (state,action) => produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
    }),
    [SET_PRODUCT]: (state,action) => produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.product_list = action.payload.data; 
    }),
},initialState);

//actionCreators export
const actionCreators = {
    setProduct,
    setProductAPI,
    setOneProductAPI,

};

export { actionCreators };





