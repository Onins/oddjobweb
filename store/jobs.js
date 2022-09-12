import axios from 'axios'

export const state = () => ({
  jobList: [],
  myJobList: [],
})

export const getters = {
  getJobList: (state) => state.jobList,
  getMyJobList: (state) => state.myJobList
}

export const mutations = {
  setJobList: (state, getJobList) => (state.jobList = getJobList),
  setMyJobList: (state, getMyJobList) => (state.myJobList = getMyJobList)
}

export const actions = {
  // async fetchJobs({commit}, data) {
  //   let jsonData = JSON.stringify({
  //     query: 'mutation {\n  addPost(\n		post: {\n      title: "'+data.title+'",\n      content: "'+data.content+'",\n      image: "'+data.image+'"\n    }\n  ) {\n    id, title, content\n  }\n}',
  //     variables: {}
  //   });

  //   let config = {
  //     method: 'get',
  //     url: 'http://localhost:3080/jobs',
  //     headers: {},
  //     data : jsonData
  //   };

  
  //   axios(config).then((response)=> {
  //     commit('setJobList', response);    
  //   });
  // }
    async updateMyJobPage({commit}, data) {
      if (data.userID != "" && data.auth != "") {
        let config = {
          method: 'get',
          url: 'http://localhost:3080/user/'+data.userID+'/jobsassigned',
          headers: {
            'Authorization': 'Bearer '+data.auth
          }
        };
    
        axios(config)
        .then((response)=>{    
          console.log("test", response);
          commit("setMyJobList", response.data.jobs);    
        }).catch((error)=> {
          console.log(error);          
        });
      }

      else {
        commit("setMyJobList", []); 
      }
      
    }
}