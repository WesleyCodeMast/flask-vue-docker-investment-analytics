<template>
  <div class="login">
    <Card class="login-inner">
      <h2 style="text-align: center;">Sign in with email</h2>
      <Input placeholder="E-mail" v-model:value="email" />
      <Input placeholder="Password" type="password" v-model:value="password" />
      <p>Don't you have an account? <a href="/register">Sign up</a></p>
      <Button
        :loading="loading"
        :disabled="!email && !password"
        @click="login"
      >Sign in</Button>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import Card from '@/components/ui/CardComponent.vue';
import Input from '@/components/ui/InputComponent.vue';
import Button from '@/components/ui/ButtonComponent.vue';

import { LOADING } from '@/store/actions/application';
import { SIGNIN_REQUEST } from '@/store/actions/user';

export default defineComponent({
  name: 'LoginView',
  components: {
    Card,
    Input,
    Button,
  },
  setup() {
    const store = useStore();

    const email = ref('');
    const password = ref('');

    const loading = ref(false);

    onMounted(() => {
      store.commit(LOADING, false);
    });

    const login = () => {
      loading.value = true;

      const context = {
        email: email.value,
        password: password.value,
      };

      store.dispatch(SIGNIN_REQUEST, context).then(() => {
        window.location.reload();
      }).finally(() => {
        loading.value = false;
      });
    };

    return {
      email,
      password,
      loading,
      login,
    };
  },
});
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login > .login-inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 320px;
}

.login > .login-inner > * {
  width: 100%;
}
</style>
