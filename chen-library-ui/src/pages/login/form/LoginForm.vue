<template>
  <div class="login-form">
    <el-form ref="loginForm" label-position="top" label-width="80px" :model="user">
      <el-form-item label="用户名" prop="username" :rules="[
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        }
      ]">
        <el-input v-model="user.username" placeholder="请输入您的登录用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="[
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        }
      ]">
        <el-input v-model="user.password" placeholder="请输入您的登录密码" type="password"
          @keydown.enter="handleLogin" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="captcha.enable" label="验证码">
        <div v-if="captcha.type == 'audio'">
          <el-row :gutter="15">
            <el-col :span="20">
              <audio controls="controls" :src="captcha.captcha"></audio>
            </el-col>
            <el-col :span="4">
              <el-tooltip placement="top" content="刷新语音验证码">
                <el-button icon="Refresh" class="btn-audio-refresh" @click="loadCaptcha"></el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <el-tooltip placement="right" content="点击可刷新验证码">
            <img :src="captcha.captcha" class="pointer" @click="loadCaptcha" />
          </el-tooltip>
        </div>
        <el-input v-model="user.captcha" placeholder="请输入验证码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="Check" @click="handleLogin(loginForm)"
          :loading="loading">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

const loginForm = ref()
const user = reactive({
  username: '',
  password: '',
  captcha: ''
})

let captcha = reactive({
  "enable": true,
  "id": "fHCG0erY7v3cvrKGVh8K",
  "captcha": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAA8CAMAAABvocdvAAAA81BMVEUAAABwFAy7X1fTd2+WOjKFKSGEKCDrj4eHKyOyVk6wVEypTUWKLiarT0e6Xla0WFCcQDirT0e3W1NmCgKVOTFmCgJ+IhrNcWnVeXHBZV3BZV1+IhrcgHiAJBynS0OWOjJ7HxfKbmbvk4vFaWGdQTnDZ1/BZV3kiIDjh3+OMiqLLydkCADkiIBkCACXOzOvU0tyFg6+YlrghHzCZl58IBiBJR3NcWmlSUGiRj68YFiYPDRrDwewVEydQTnCZl56HhaRNS3NcWnliYGWOjKyVk7tkYmKLiZ3GxPni4ObPzfYfHSgRDzhhX2HKyPrj4fTd29sEAirpn+HAAAAAXRSTlMAQObYZgAABINJREFUeJzsmltL80wQx7OeWmq1qHhjrQpSL6pYoYKCUpBKEQn9/h/npc1pNzOzOzPZ9LXw/C/aJHuY+WX2lGSTf0qS5Pf/dmDL+v3VEncje7ItqXm7u0qsVfu8h+Esx607EUdXnEyHh0Hi4+PdIL664hGHs+wGLzPCuZ7BlT0i56Xan7+k5+c68d4eTnx5KSJ+a+JVm2opwm9v2yf+UJd8imAd5b1uXK3nrn98aImfnoLEM1XF19dNib39qsUIz2Ye4hs6ieD9Ynm1EadfGWO86bd8c6XqvJPq8ObGQ4zq60tATKm/Ac3lzXl7axMTC7ye39pkYhNL/NwoBm+/b5jAToSJJXyvFyJW+BhwS6h+1ZJFFesirBIjFkny6q/Crc/9/3tiNMHXV5IYFDRlQkQfccl77UZrz0JhpnjJOwUutsAvH5ddV2yXCI76tc0pigIqS+brn7jULu+PrPDIAieaOGy9JgkCF0Xm8/m6uccK9ClYgfz8iIhHo1HV+7LfOtwmQm7ksIx2kj2ezcGVBjo9zYjtrqaIMDraOqe1lpofwNrKe4FY0jXshXua89KDKWYWRcJOEvOeH0wMyEF3dYKLMQtCLRYL7DKbNx8/3F4JW2uh9/eM2FrKGc/04+UNJFFCebki2m7WR5HhyhQRNhO0FKjehKCsxAOx+1JhHuZ/5GwEi3pbdHjaLZMPDtomRj2xRiSEGIELtOhwm62IWV6rRd35aglBArv93QvM6aNYngtGOZF8nhhDLiSKpo6MaviykucMuHJxEZU45EYWQWJhXEvxPSFwZx0k21Z40zIpMNjwRizBlOOUfgTJQ3ZFeO3E9TRNjT1Ks9wrS/DtEE4V2R8f68TD4bekqnrNtB+p9bTA4J1VZ+gMJvSrIgZp399q4nCvylnpjAVc9qI0vzvQIcUSii6i52VnpEJsXZ+VOQ0MgZg31T8+kV3cF17YjoB5+p1GgxAUSlM18XBIEPtqgyMFLED17AgdOI+wlhi/bJI7TyGEl20e5T3jlVWaZNRjkrs7h5jx+V1rbM17FpX4XFWJyxveYJHpQWarsKbkxQea83MRMX7TAO8ALfnwICSG1lbIN29RBXmEp/oKsC0YgwFBzDRDWlut4K4GfxV4hKZTBjE+sOKbbFzeTmlctF8L81UYYRJ5Cg68rxuPrOPwJptOJyeW7ciLNchCZAvNDXU1W7pljo4qYk4r7ZRHXQbF2DkTvWajPpLQoUM6M7ZGsHgl41CPE7fxeGw56bxIPQkUtT8LpU5K9Rij/EixKo8kvD0eceZifmbznoSJi6NseQml7CerVUYs/LrfY9vE4xDitUOM86qV88bYv4FJPV7pvnTyNzfqeMPP0apqJXLij8+sMXc8xwO61xWr9XCUN+qedj8x/37c32uJw1m61HOfSuTksJTNGwHeF4lPUOiTvVY41nK5jGcieXlpStyodG07Af7CIyZv4whL5d4fuIXTbbyDqKPZPpXwGc0EUL0HIFtWLeT1E2VE3n2C+POzTWJGHlN+Lx9E3XMlj/B/AQAA///t8Tu7kvTCqAAAAABJRU5ErkJggg==",
  "type": "digit"
})

const loadCaptcha = () => {
  console.log(captcha, "caaaaaaaaaaaa")
  captcha = reactive({
    "enable": true,
    "id": "fHCG0erY7v3cvrKGVh8K",
    "captcha": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAA8CAMAAABvocdvAAAA81BMVEUAAABwFAy7X1fTd2+WOjKFKSGEKCDrj4eHKyOyVk6wVEypTUWKLiarT0e6Xla0WFCcQDirT0e3W1NmCgKVOTFmCgJ+IhrNcWnVeXHBZV3BZV1+IhrcgHiAJBynS0OWOjJ7HxfKbmbvk4vFaWGdQTnDZ1/BZV3kiIDjh3+OMiqLLydkCADkiIBkCACXOzOvU0tyFg6+YlrghHzCZl58IBiBJR3NcWmlSUGiRj68YFiYPDRrDwewVEydQTnCZl56HhaRNS3NcWnliYGWOjKyVk7tkYmKLiZ3GxPni4ObPzfYfHSgRDzhhX2HKyPrj4fTd29sEAirpn+HAAAAAXRSTlMAQObYZgAABINJREFUeJzsmltL80wQx7OeWmq1qHhjrQpSL6pYoYKCUpBKEQn9/h/npc1pNzOzOzPZ9LXw/C/aJHuY+WX2lGSTf0qS5Pf/dmDL+v3VEncje7ItqXm7u0qsVfu8h+Esx607EUdXnEyHh0Hi4+PdIL664hGHs+wGLzPCuZ7BlT0i56Xan7+k5+c68d4eTnx5KSJ+a+JVm2opwm9v2yf+UJd8imAd5b1uXK3nrn98aImfnoLEM1XF19dNib39qsUIz2Ye4hs6ieD9Ynm1EadfGWO86bd8c6XqvJPq8ObGQ4zq60tATKm/Ac3lzXl7axMTC7ye39pkYhNL/NwoBm+/b5jAToSJJXyvFyJW+BhwS6h+1ZJFFesirBIjFkny6q/Crc/9/3tiNMHXV5IYFDRlQkQfccl77UZrz0JhpnjJOwUutsAvH5ddV2yXCI76tc0pigIqS+brn7jULu+PrPDIAieaOGy9JgkCF0Xm8/m6uccK9ClYgfz8iIhHo1HV+7LfOtwmQm7ksIx2kj2ezcGVBjo9zYjtrqaIMDraOqe1lpofwNrKe4FY0jXshXua89KDKWYWRcJOEvOeH0wMyEF3dYKLMQtCLRYL7DKbNx8/3F4JW2uh9/eM2FrKGc/04+UNJFFCebki2m7WR5HhyhQRNhO0FKjehKCsxAOx+1JhHuZ/5GwEi3pbdHjaLZMPDtomRj2xRiSEGIELtOhwm62IWV6rRd35aglBArv93QvM6aNYngtGOZF8nhhDLiSKpo6MaviykucMuHJxEZU45EYWQWJhXEvxPSFwZx0k21Z40zIpMNjwRizBlOOUfgTJQ3ZFeO3E9TRNjT1Ks9wrS/DtEE4V2R8f68TD4bekqnrNtB+p9bTA4J1VZ+gMJvSrIgZp399q4nCvylnpjAVc9qI0vzvQIcUSii6i52VnpEJsXZ+VOQ0MgZg31T8+kV3cF17YjoB5+p1GgxAUSlM18XBIEPtqgyMFLED17AgdOI+wlhi/bJI7TyGEl20e5T3jlVWaZNRjkrs7h5jx+V1rbM17FpX4XFWJyxveYJHpQWarsKbkxQea83MRMX7TAO8ALfnwICSG1lbIN29RBXmEp/oKsC0YgwFBzDRDWlut4K4GfxV4hKZTBjE+sOKbbFzeTmlctF8L81UYYRJ5Cg68rxuPrOPwJptOJyeW7ciLNchCZAvNDXU1W7pljo4qYk4r7ZRHXQbF2DkTvWajPpLQoUM6M7ZGsHgl41CPE7fxeGw56bxIPQkUtT8LpU5K9Rij/EixKo8kvD0eceZifmbznoSJi6NseQml7CerVUYs/LrfY9vE4xDitUOM86qV88bYv4FJPV7pvnTyNzfqeMPP0apqJXLij8+sMXc8xwO61xWr9XCUN+qedj8x/37c32uJw1m61HOfSuTksJTNGwHeF4lPUOiTvVY41nK5jGcieXlpStyodG07Af7CIyZv4whL5d4fuIXTbbyDqKPZPpXwGc0EUL0HIFtWLeT1E2VE3n2C+POzTWJGHlN+Lx9E3XMlj/B/AQAA///t8Tu7kvTCqAAAAABJRU5ErkJggg==",
    "type": "digit"
  })
}

const loading = ref(false)

const handleLogin = async (formRef) => {
  loading.value = true
  await formRef.validate((valid) => {
    if (valid) {
      console.log('submit')
    } else {
      console.log('error submit')
    }
    loading.value = false
  })
}

onMounted(() => {
  loadCaptcha()
})
</script>
<style scoped>
.btn-audio-refresh {
  vertical-align: -webkit-baseline-middle;
}
</style>
