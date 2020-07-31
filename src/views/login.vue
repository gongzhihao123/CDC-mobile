<template>
  <div class="login">
      <div class="loginBox">
        <div class="form-item">
          <div class="inputDiv">
            <img round :src="require('./../assets/img/login_mobile_user.png')" />
            <input class="username" v-model="userName" type="text" @keyup.enter="submit" autocomplete="off" placeholder="手机号码">
            <p class="tip" v-if="userFlag">请输入正确的手机号码</p>
          </div>
        </div>
        <div class="form-item" v-if="!isReg">
          <div class="inputDiv">
            <img :src="require('./../assets/img/login_mobile_password.png')" />
            <input class="password" v-model="password" @keyup.enter="submit" type="password" autocomplete="off" placeholder="密码">
            <p class="tip" v-if="passwordFlag">手机号码或密码不正确</p>
          </div>
        </div>
        <div class="form-item" v-if="!isReg"><button @click="submit">登 录</button></div>
        <div class="form-item" v-if="isReg"><button @click="regConfirm">注 册</button></div>
        <div class="reg-bar">
            <div class="reg">
              <span @click="reg">立即注册</span>
              <img round :src="require('./../assets/img/login_mobile_user.png')" />
              </div>
            <div class="forget" v-on:click="showForgetPopup">
              <span>忘记密码</span>
              <img round :src="require('./../assets/img/login_mobile_fotget.png')" />
            </div>
        </div>
      </div>
      <van-popup v-model="showForget" round position="bottom" :style="{ height: '16%' }" >
        <div class="fotgetPopup">
          <van-image :src="require('./../assets/img/forget_phone.jpg')" height="70" width="70"/>
          <div class="popContent">
            <p>请联系技术支持</p>
            <!-- <p>曹老师 <a href="tel:15611131830">15611131830</a></p> -->
            <p>曹老师 <a href="tel:13146032798">13146032798</a></p>
          </div>
        </div>
      </van-popup>
  </div>
</template>
<script>
import { apiLogin, apiReg } from '@/services/api/index'
export default {
  data () {
    return {
      userName: '',
      userFlag: false,
      password: '',
      passwordFlag: false,
      isReg: false,
      showForget: false
    }
  },
  methods: {
    reg () {
      this.isReg = true
    },
    regConfirm () {
      if (!this.userName) {
        this.userFlag = true
      } else {
        apiReg({ account: this.userName })
          .then(res => {
            if (res.code === 1) {
              console.log(res)
              this.$toast.success(res.message)
              this.isReg = false
            } else {
              this.$toast.fail(res.message)
            }
          })
      }
    },
    // 验证
    checkBox () {
      if (!this.userName) {
        this.userFlag = true
        return false
      } else {
        this.userFlag = false
      }
      if (!this.password) {
        this.passwordFlag = true
        return false
      } else {
        this.passwordFlag = false
      }
      return true
    },
    submit () {
      if (this.checkBox()) {
        apiLogin({
          account: this.userName,
          password: this.password
        })
          .then((res) => {
            if (res.code === 1) {
              window.localStorage.setItem('userName', this.userName)
              window.localStorage.setItem('token', res.data)
              this.$router.push('/home')
            }
            this.$toast(res.message)
          })
      }
    },
    showForgetPopup () {
      this.showForget = true
    }
  },
  mounted () {
    const token = window.localStorage.getItem('token')
    if (token !== null) {
      console.log(token !== null)
      this.$router.push('/home')
    }
  }
}
</script>
<style>
  * { margin: 0; padding: 0; }
  html { height: 100%; }
  body { height: 100%; }
  .login { height: 100%; width: 100%;   }
  .loginBox { position: absolute; display:flex; flex-direction: column; justify-content: center; left: 50%; top: 50%; width: 100%; height: 100%; border-radius: 20px; overflow: hidden; background: #fff url(./../assets/img/login_mobile.png) 50% 50% no-repeat; background-size: cover; border: 1px solid #fff;}
  .loginBox > .form-item:first-child { margin-top: 70%; }
  .login .form-item { display: inline-flex; position: relative; width: 360px; margin: 0 auto; padding-bottom: 30px;}
  .login .form-item input { width: 248px; height: 48px; padding-left: 20px; border-radius: 25px; font-size: 18px; color: #08AE8E; background-color: transparent; outline: none;}
  .login .form-item button { height: 50px; border: 0; border-radius: 25px; font-size: 18px; color: #fff; outline: none; cursor: pointer; background: linear-gradient(45deg, #07e6da, #08AE8E); }
  .login .form-item .inputDiv { display: inline-flex; align-items: center; border: 1PX solid #08AE8E; border-radius: 25px;}
  .login .form-item .inputDiv img {  height: 1.6rem; margin-left: 14px; vertical-align: middle;}
  .login .form-item .inputDiv:last-child { width: 100%; }
  .login .tip { position: absolute; left: 20px; top: 52px; font-size: 14px; color: #f50; }
  .login .reg-bar { margin: 20px auto 0; font-size: 14px; overflow: hidden;}
  .login .reg-bar span { color: #08AE8E; text-decoration: none; font-size: 16px;}
  .login .reg-bar span:hover { text-decoration: underline; }
  .login .reg-bar .reg { float: left; padding-left: 10px;}
  .login .reg-bar .reg span { vertical-align: middle; }
  .login .reg-bar .reg img { vertical-align: middle; margin-left:3px; width: 1rem; }

  .login .reg-bar .forget { float: right; padding-right: 10px; }
  .login .reg-bar .forget span { vertical-align: middle; }
  .login .reg-bar .forget img { vertical-align: middle; margin-left:3px; width: 1rem; }
  .login ::-webkit-input-placeholder { font-size: 18px; line-height: 1.4; color: #08AE8E;}
  .login :-moz-placeholder { font-size: 18px; line-height: 1.4; color: #08AE8E;}
  .login ::-moz-placeholder { font-size: 18px; line-height: 1.4; color: #08AE8E;}
  .login :-ms-input-placeholder { font-size: 18px; line-height: 1.4; color: #08AE8E;}

  @media screen and (max-width: 500px) {
      * { box-sizing: border-box; }
      .login {  width: auto; height: 100%;  }
      .loginBox {
        padding: 0 30px;
        position: static;
        border: 0; border-radius: 0;
      }
      .logo { margin: 50px auto; }
      .login .form-item { width: 100%; }
      .login .form-item input, .form-item button, .reg-bar { width: 100%; font-size: 24px; }
  }
  .fotgetPopup { display: inline-flex; padding-left: 50px; }
  .fotgetPopup .popContent { margin-left: 6px;font-size: 16px; padding-top: 15px; line-height: 20px;}
</style>
