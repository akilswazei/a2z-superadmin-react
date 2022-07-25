  export const mediaReducer = (state = {mediaOpen:false,fileFields:{},fileInput:''}, { type, payload }) => {
    //console.log(payload)
    switch (type) {
      case 'MediaOpen':
        return { ...state,mediaOpen:payload }
        break;
      case 'UpdateFileField':
          return { ...state,fileFields:{...state.fileFields,...payload} }
          break;  
      case 'CleanFileField':
            return { ...state,fileFields:{} }
            break;      
      case 'setFileInput':
          return { ...state,fileInput:payload }
          break;  
       default:
       return state
    }
}
