import axios from 'axios'
  
export default function ({store}) {
  if (localStorage.getItem('userid') != "" && localStorage.getItem('userid') != null){
    let config = {
      method: 'get',
      url: 'http://localhost:3080/user/'+localStorage.getItem('userid')
    };

    axios(config)
    .then((response)=>{    
      store.commit("user/setUserName", response.data.name);    
      store.commit("user/setUserEmail", response.data.email); 
    }).catch((error)=> {
      console.log(error);          
    });
  }   
}

