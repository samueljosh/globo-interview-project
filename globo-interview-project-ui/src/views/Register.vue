<template>
  <v-data-table
    v-if="users"
    :headers="headers"
    :items="users"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Usuários </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Adicionar usuário
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      required
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <!-- <v-text-field
                      v-model="editedItem.levelAccess"
                      label="Nível de Acesso"
                    ></v-text-field> -->

                    <v-select
                      v-model="editedItem.levelAccess"
                      label="Selecione o Nível de Acesso do Usuário"
                      :items="['Administrador', 'Funcionário']"
                      :rules="levelAccessRules"
                      required
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Senha"
                      :rules="passwordRules"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                :disabled=" editedItem  && editedItem.password && editedItem.password.length < 5"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Você tem certeza que deseja deletar este usuário?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getUsers"> Resetar </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Código",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Email", value: "email" },
      { text: "Nível de Acesso", value: "levelAccess" },
      { text: "Password", value: "password" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      email: "",
      levelAccess: 0,
      password: "",
      id: 0,
    },
    defaultItem: {
      email: "",
      levelAccess: 0,
      password: "",
      id: 0,
    },
    passwordRules: [
      (v) =>
        (v && v.length >= 6) || "A Senha deve possuir ao menos 6 caracteres",
    ],
    levelAccessRules: [
       (v) =>
        (v && v.length >= 1) || "É necessário selecionar um nível de acesso",
    ],
    emailRules: [
      (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Email deve ser válido",
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo usuário" : "Editar usuário";
    },
    ...mapGetters({
      users: "users",
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getUsers();
  },

  methods: {
    ...mapActions(["getUsers", "createUser", "deleteUser", "updateUser"]),

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.password = "";
      this.dialog = true;
    },

    deleteItem(item) {
      console.log('deletando',item)
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = item.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log("removendo", this.editedItem);
      this.deleteUser(this.editedItem);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateUser(this.editedItem);
      } else {
        this.createUser(this.editedItem);
      }
      this.close();
    },
  },
};
</script>