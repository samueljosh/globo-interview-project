
const state = {
    cpuUsage: null,
    memoryUsage: null,
    clusterStatus: null
};
const getters = {
    cpuUsage: (state) => state.cpuUsage,
    memoryUsage: (state) => state.memoryUsage,
    clusterStatus: (state) => state.clusterStatus,
};
const actions = {
    async fetchMonitor({ dispatch }) {
        dispatch('getMemoryUsage');
        dispatch('getCpuUsage');
        dispatch('getClusterStatus');

    },
    async getMemoryUsage({ commit }) {
        try {
            console.log('get memory')

            let response = await fetch(
                "https://run.mocky.io/v3/d23c3262-967e-4567-b7f6-2fd263748811"
            );
            let data = await response.json();
            console.log('memory', data)
            commit("setMemoryUsage", data);
        }
        catch (err) {
            console.log(err)
        }
    },
    async getCpuUsage({ commit }) {
        try {
            console.log('get cpu')
            let response = await fetch(
                "https://run.mocky.io/v3/b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f"
            );
            let data = await response.json();
            console.log('cpu', data)

            commit("setCpuUsage", data);
        }
        catch (err) {
            console.log(err)
        }
    },
    async getClusterStatus({ commit }) {
        try {
            let response = await fetch(
                "https://run.mocky.io/v3/cab2791c-7c85-4461-b95c-86bc1a12dc72"
            );
            let data = await response.json();
            commit("setStatusCluster", data);
        }
        catch (err) {
            console.log(err)
        }
    },
};

const mutations = {
    setCpuUsage(state, payload) {
        const { labels, data } = payload

        state.cpuUsage =
        {
            labels,
            datasets: [
                {
                    label: "CPU Usage",
                    backgroundColor: "#E0E0E0",
                    data
                },
            ],
        }

    },
    setMemoryUsage(state, payload) {
        const { labels, data } = payload

        state.memoryUsage =
        {
            labels,
            datasets: [
                {
                    label: "Memory Usage",
                    backgroundColor: "#E0E0E0",
                    data
                },
            ],
        }

    },
    setStatusCluster(state, { status }) {
        console.log('setando status cluster', status)
        state.clusterStatus = status;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
