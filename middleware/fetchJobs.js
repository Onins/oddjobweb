import axios from 'axios'
  
export default function ({store}) {
  let config = {
    method: 'get',
    url: 'http://localhost:3080/jobs',
    headers: {}
  };

  axios(config)
  .then((response)=>{    
    store.commit("jobs/setJobList", response.data.jobs);    
  })
}

