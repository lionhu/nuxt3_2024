<script lang="ts" setup>
import { useForm, useField } from 'vee-validate'

const { handleSubmit, errors } = useForm({
  validationSchema: {
    username: 'required|min:2',
    email: 'required|email',
  },
})
const { value: username } = useField('username')
const { value: email } = useField('email')

const submit = handleSubmit(() => {
  console.log(username.value, email.value)
})
</script>

<template>
  <div class="form">
    <div class="field">
      <label for="username">username</label>
      <input v-model="username" type="text" name="username" />
      <small v-if="errors['username']"
        ><span class="invalid">{{ errors['username'] }}</span></small
      >
    </div>
    <div class="field">
      <label for="email">email</label>
      <input
        v-model="email"
        type="text"
        name="email"
        placeholder="admin@example.com"
      />
      <small v-if="errors['email']"
        ><span class="invalid">{{ errors['email'] }}</span></small
      >
    </div>
    <div class="field">
      <button type="button" @click="submit">
        {{ $t('buttons.sumbit') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
html {
  font-size: 14px;
}
.form {
  .field {
    padding: 0.5rem 0;
  }
  input {
    width: 15rem;
    display: block;
  }
  label {
    display: block;
    font-weight: bold;
  }

  .invalid {
    color: red;
  }
}
</style>
