
import axios from 'axios';

const state = {
    user: null,
    users: null,
};
const getters = {
    isAuthenticated: (state) => !!state.user,
    getUsers: (state) => state.users,

};
const actions = {

    async LogIn({ commit }, user) {
        const response = await axios.post("login", (Object.fromEntries(user)))
        console.log('response', response)
        await commit("setUser", response.data.valid);
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
    logout(state, user) {
        state.user = user;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};
