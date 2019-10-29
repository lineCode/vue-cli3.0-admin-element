<template>
	<div id="login">
		<div class="box">
			<div class="img-box">
				<img src="" alt="">
			</div>
			<div class="title-box">
				<p>后台管理系统</p>
			</div>
			<div class="form-box">
				<el-form ref="ruleForm" :model="formLogin" :rules="rules" class="demo-ruleForm">
					<el-form-item prop="user">
						<el-input type="username" v-model="formLogin.user" placeholder="输入用户">
							<i style="font-size: 20px;" slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
						</el-input>
					</el-form-item>
					<el-form-item prop="pass">
						<el-input :type="formPassType" v-model="formLogin.pass" placeholder="输入密码">
							<i style="font-size: 20px;" slot="prefix" class="el-input__icon el-icon-lock"></i>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-row type="flex">
							<el-col :span="12">
								<div>
									<el-checkbox v-model="rememberPass" @change="changeRemember">记住密码</el-checkbox>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="txt-right">
									忘记密码?
								</div>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
let self = {}
import ThisJs from './Login'
import { mapState, mapActions } from 'vuex'
// import { Notification } from 'element-ui';
// import router, { resetRouter } from '@/router.js'
// import unit from '@/unit/unit.js'
export default {
	name: 'login',
	data () {
		const validateUser = (rule, value, callback) => {
			if (!value) {
				callback(new Error('用户不能为空'))
			} else {
				callback()
			}
		}
		const validatePass = (rule, value, callback) => {
			if (!value) {
				callback(new Error('密码不能为空'))
			} else {
				callback()
			}
		}
		return {
			// 验证规则
			rules: {
				user: [
					{ validator: validateUser, trigger: 'blur' }
				],
				pass: [
					{ validator: validatePass, trigger: 'blur' }
				]
			},
			// 登录字段
			formLogin: {},
			// 登录密码类型
			formPassType: 'password',
			// 是否记住账号密码
			rememberPass: false
		}
	},
	computed: {
		...mapState([
			'base'
		])
	},
	created () {
    this.ThisJs = new ThisJs(this)
	},
	mounted () {
		self = this
		// 是否记住密码设置
		if (self.base.rememberPass) {
			self.$set(self, 'formLogin', self.base.formLogin)
			self.$set(self, 'rememberPass', self.base.rememberPass)
		}
	},
	methods: {
		...mapActions([
			'CHANGE_TOKEN_ACT',
			'CHANGE_FORMlOGIN_ACT',
			'CHANGE_REMEMBERPASS_ACT',
			'CHANGE_LIMIT_ACT',
			'CHANGE_CLICKROUTE_ACT',
			'CHANGE_PUBKEY_ACT'
		]),
		/**
		 * @param {记住密码值变化函数}
		 * @param {是否记住密码的值} val
		 */
		changeRemember (val) {
			self.CHANGE_REMEMBERPASS_ACT(val)
		},
		/**
		 * @param {登录确认}
		 * @param {验证结果} formName
		 */
		submitForm (formName) {
			self.$refs[formName].validate((valid) => {
				if (valid) {
					self.ThisJs.login(self.formLogin)
				} else {
					return false
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
#login{
	position: relative;
	height: 100%;
	// background: #f3f3f3;
	background: linear-gradient(60deg, rgba(84, 58, 183, 0.8) 0%, rgba(0, 172, 193, 1) 100%);
	.box{
		position: absolute;
		width: 400px;
		height: auto;
		box-sizing: border-box;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		// 图片样式
		.img-box{
			img{
			}
		}
		.title-box{
			color: #fff;
			text-align: center;
			font-size: 20px;
			font-weight: 600;
			margin: 12px 0;
		}
		// 表单样式
		.form-box{
			// background: #fff;
			border-radius: 8px;
			padding: 20px;
			.el-form-item{
				margin-bottom: 24px;
				.el-button{
					width: 100%;
				}
			}
			.el-form-item:last-child{
				margin-bottom: 0;
			}
		}
	}
}
</style>