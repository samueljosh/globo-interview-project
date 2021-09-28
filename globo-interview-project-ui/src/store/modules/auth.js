
import axios from 'axios';

const state = {
    user: null,
    users: null,
    levelAccess: null
};
const getters = {
    isAuthenticated: (state) => !!state.user,
    users: (state) => state.users,
    levelAccess: (state) => state.levelAccess

};
const actions = {

    async LogIn({ commit }, user) {
        const response = await axios.post("login", (Object.fromEntries(user)))
        console.log('logando', response)
        await commit("setUser", response.data.valid);
        await commit("setLevelAccess", response.data.levelAccess)
    },

    async getUsers({ commit }) {
        const response = await axios.get("getAll");
        console.log('response', response.data)
        await commit("setUsers", response.data);
    },


    async createUser({ dispatch }, user) {
        console.log('criando user', user)
        await axios.post("create", user);
        dispatch("getUsers")
    },

    async updateUser({ dispatch }, user) {
        console.log('atualizando', user)
        await axios.put("update", user);
        dispatch("getUsers")
    },

    async deleteUser({ dispatch }, id) {
        console.log('deletando', id)
        const response = await axios.delete(`delete/${id}`);
        console.log('response', response)
        dispatch("getUsers")
    },

    async LogOut({ commit }) {
        let user = null;
        commit("logout", user);
    },

};
const mutations = {
    setUser(state, email) {
        state.user = email;
    },
    setLevelAccess(state, levelAccess) {
        state.levelAccess = levelAccess;
    },
    setUsers(state, users) {
        state.users = users.map((user) => {
            return {
                ...user,
                password: "************"
            }
        });
    },
    logout(state, user) {
        state.user = user;
        state.levelAccess = null
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};
