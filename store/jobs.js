import axios from 'axios'

export const state = () => ({
  jobList: [],
  myJobList: [],
  selectedJob: [],
})

export const getters = {
  getJobList: (state) => state.jobList,
  getMyJobList: (state) => state.myJobList,
  getSelectedJob: (state) => state.selectedJob
}

export const mutations = {
  setJobList: (state, getJobList) => (state.jobList = getJobList),
  setMyJobList: (state, getMyJobList) => (state.myJobList = getMyJobList),
  setSelectedJob: (state, getSelectedJob) => (state.selectedJob = getSelectedJob)
}

export const actions = {
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