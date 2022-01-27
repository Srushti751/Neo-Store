export const userReducer = (state={},action)=>{
    switch(action.type){
        case 'USER_REGISTER_REQ':  
            return{
                loading:true
            }
        case 'USER_REGISTER_SUCCESS':
            return{
                loading:false,
                success:true

            }
        case 'USER_REGISTER_FAIL':
            return{
                error : action.payload,
                loading:false

            }
        default: return state
    }
}

export const loginUserReducer = (state={},action)=>{
    switch(action.type){
        case 'USER_LOGIN_REQ':  
            return{
                loading:true
            }
        case 'USER_LOGIN_SUCCESS':
            return{
                loading:false,
                success:true,
                currentUser:action.payload
            }
        case 'USER_LOGIN_FAIL':
            return{
                error : action.payload,
                loading:false

            }
        default: return state
    }
}