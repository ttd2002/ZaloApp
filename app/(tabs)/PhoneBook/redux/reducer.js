

const initialState ={
    dataCreateGroup:[]
}
const appReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'createGroup/add':
            return{
                ...state,
                dataCreateGroup:[...state.dataCreateGroup,action.payload]
            }
    }
    
}
export default appReducer;