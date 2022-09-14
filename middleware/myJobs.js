import axios from 'axios'
  
export default function ({store}) {
  // if (localStorage.getItem('userid') != "" && localStorage.getItem('userid') != null){
    let config = {
      method: 'get',
      url: 'http://localhost:3080/user/'+localStorage.getItem('userid')+'/jobsassigned',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('auth')
      }
    };

    axios(config)
    .then((response)=>{    
      store.commit("jobs/setMyJobList", response.data.jobs);    
    }).catch((error)=> {
      console.log(error);          
    });
  // }
  // else {
  //   store.commit("jobs/setMyJobList", []);    
  // }
}

