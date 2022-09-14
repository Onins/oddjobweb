import axios from 'axios'
  
export default function ({store, route}) {
  let result;  

  let config = {
    method: 'get',
    url: 'http://localhost:3080/jobs/' +route.params.id,
    headers: { 
      'Content-Type': 'application/json'
    }
  };

  axios(config)
  .then((response)=>{
    result = response.data;
    store.commit("jobs/setSelectedJob", result);
  })
}
