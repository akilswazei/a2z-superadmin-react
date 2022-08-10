import axios from 'axios';

export const getLeads = async (userInfo,page=1,search_keyword="") => {
    // let getpara=[]
    // getpara[0]=page==1?'':"page="+page;
    // getpara[1]=search_keyword==""?'':"s="+search_keyword;
    // const para = getpara.join('&');
    // const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/lead/list?'+para, {
    //     headers: {
    //       Authorization: 'Bearer ' + userInfo.data.token,
    //     }
    //   })
      return {"status":"success","message":"Lead found successfully.","columns":[{"id":1,"title":"New","cardIds":[80]},{"id":2,"title":"contacted","cardIds":[79,83]},{"id":3,"title":"proposal sent","cardIds":[]},{"id":4,"title":"Meeting","cardIds":[]},{"id":5,"title":"Negotiation","cardIds":[]},{"id":6,"title":"Converted","cardIds":[]}],"cards":[{"id":80, "column_id": 1,"title":"Sebastian Gibson","desc":"manager","email":"kshlerin.toy@reilly.com","phone":"+15204253234","lead_date":"Jun 22,2022"},{"id":79,"column_id": 2,"title":"Mario Hale","desc":"manager","email":"eula81@hessel.com","phone":"457-631-5443","lead_date":"Jun 22,2022"},,{"id":83,"column_id": 2,"title":"tMario Hale","desc":"manager","email":"teula81@hessel.com","phone":"457-631-5443","lead_date":"Jun 22,2022"}]}
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