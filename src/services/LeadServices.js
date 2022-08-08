import axios from 'axios';

export const getLeads = async (userInfo,page=1,search_keyword="") => {
    let getpara=[]
    getpara[0]=page==1?'':"page="+page;
    getpara[1]=search_keyword==""?'':"s="+search_keyword;
    const para = getpara.join('&');
    const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/lead/list?'+para, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        }
      })
      return data
}

export const leadUpdateStatus = async (userInfo, userdata) => {
    
  const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/lead/lead-update-status', userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getLeadInfo = async (userInfo,lead_id="0") => {    
    const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/lead/listinfo?lead_id='+lead_id, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        }
      })
      return data
}

export const addAttachment = async (userInfo, userdata) => {    
    const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/lead/add-attachment', userdata, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        },
    })
    return data
}

export const getAttachment = async (userInfo, lead_id="0") => {
    const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/lead/get-attachment?lead_id='+lead_id, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        },
    })
    return data
}

export const sendSMS = async (userInfo, userdata) => {
    const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/lead/send-sms', userdata, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        },
    })
    return data
}

export const sendEmail = async (userInfo, userdata) => {
    const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/lead/send-email', userdata, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        },
    })
    return data
}

export const getMembers = async (userInfo, lead_id="0") => {
    let team_id = userInfo.data.user.team_id;
    let getpara=[]
    getpara[0]="lead_id="+lead_id;
    getpara[1]="team_id="+team_id;
    const para = getpara.join('&');

    const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/lead/get-members?'+para, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        },
    })
    return data
}

export const assignMembers = async (userInfo, userdata) => {    
    const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/lead/assign-members', userdata, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        },
    })
    return data
}

export const getAssignedMembers = async (userInfo, lead_id="0", team_id="0") => {
    let getpara=[]
    getpara[0]="lead_id="+lead_id;
    getpara[1]="team_id="+team_id;
    const para = getpara.join('&');

    const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/lead/get-assigned-members?'+para, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        },
    })
    return data
}