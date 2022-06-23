<template>
    <a-row type="flex">
        <a-col :xs="0" :sm="0" :md="6" :lg="6" :xl="8"></a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
            <a-form
                :model="localObj"
                name="basic"
                @finish="validateSuccess"
                @finishFailed="vaildateFail"
            >
                <a-form-item
                    name="username"
                    :rules="[{ pattern: /^\D{1,60}$/, trigger: 'blur', validator }]"
                >
                    <a-input
                        v-model:value="localObj.username"
                        :placeholder="langPack.form.username"
                    />
                </a-form-item>
                <a-form-item
                    name="pwd"
                    :rules="[{ pattern: /^.{1,60}$/, trigger: 'blur', validator }]"
                >
                    <a-input-password
                        v-model:value="localObj.pwd"
                        :placeholder="langPack.form.pwd"
                    />
                </a-form-item>
                <a-form-item
                    name="email"
                    :rules="[{ pattern: /^.{1,30}@.{5,30}$/, trigger: 'blur', validator }]"
                >
                    <a-input v-model:value="localObj.email" :placeholder="langPack.form.email" />
                </a-form-item>
                <a-form-item
                    name="tel"
                    :rules="[{ pattern: /^.{1,30}$/, trigger: 'blur', validator }]"
                >
                    <a-input v-model:value="localObj.tel" :placeholder="langPack.form.tel" />
                </a-form-item>
                <a-form-item name="keep">
                    <a-checkbox v-model:checked="localObj.keep">{{
                        langPack.form.keep
                    }}</a-checkbox>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">{{
                        langPack.form.submit
                    }}</a-button>
                    <a-button type="danger" @click="formReset">{{ langPack.form.reset }}</a-button>
                </a-form-item>
            </a-form>
        </a-col>
        <a-col :xs="0" :sm="0" :md="6" :lg="6" :xl="8"></a-col>
    </a-row>
</template>

<script setup>
//模块引入
import { reactive, computed, onDeactivated } from 'vue'
import languages from '@/views/login/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})

//本地变量和函数
const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

let localObj = reactive({
    username: '',
    pwd: '',
    email: '',
    tel: '',
    keep: false,
})

onDeactivated(() => {
    props.globalObj.checkBreakPoint()
})

function formReset() {
    console.log('清空表单')
    localObj.username = ''
    localObj.pwd = ''
    localObj.email = ''
    localObj.tel = ''
    localObj.keep = false
}

async function validator(rule, value) {
    if (value === '') {
        return Promise.reject(langPack.value.form.required)
    } else if (!rule.pattern.test(value)) {
        return Promise.reject(langPack.value.form.malformed)
    } else {
        return Promise.resolve()
    }
}

function validateSuccess(values) {
    console.log('%c' + '登录成功', 'color: forestgreen')
    doLogin(values)
}

function vaildateFail(errorInfo) {
    console.log('%c' + '登录失败:', 'color: red', errorInfo)
}

async function doLogin(obj) {
    let loginResult = Promise.resolve(Math.random() > 0.5)
    if (loginResult) {
        setTimeout(() => {
            props.globalObj.setLogin({ hasLogin: true, loginInfo: loginResult })
            props.globalObj.setTab({
                currentTab: 'home',
            })
        }, 1500)
        queryResult(true, langPack.value.form.loginSuccess)
    } else {
        props.globalObj.setLogin({ hasLogin: false, loginInfo: {} })
        queryResult(false, langPack.value.form.loginFailed)
    }
}
</script>
