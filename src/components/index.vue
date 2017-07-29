<template>
  <div class="hello">
  <div class="box">
    <div class="logo">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
     
          <el-form-item label="用户名" prop="name" >
             <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
           <el-form-item label="密码" prop="pass" >
             <el-input v-model="ruleForm.name" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="repass" >
             <el-input v-model="ruleForm.name" placeholder="" style="display:inline-block; width:50%;" ></el-input>
            
          </el-form-item> 
          <!--  <img src="../assets/logo.png" alt="" class="codeImg"> -->
          <div class="btn">
              <el-button  class="forget" >忘记密码？</el-button>
              <el-button   class="register" @click="register()">注册</el-button>
          </div>         
          <button type="primary" class="submit">登录</button>
        
    </el-form>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"hello",
    data() {
      return {
        labelPosition: 'left',
        ruleForm: {
          name: '',
          pass: '',
          repass:''       
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          repass: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      register(){
        this.$router.push({path:'/register'})
      }
    }
  }
</script>
<style scoped >
.logo{
  position: relative;
}
    .logo{width: 300px}
    .forget{float: left}
    .register{float:right}
    .codeImg{position: absolute;right: 0}
    .btn{overflow: hidden;}
    .submit{   display: inline-block;
      position: absolute;
      left: 40%;
      bottom: -70px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
      background-color: #20a0ff;
    border-color: #20a0ff;
    color: #fff;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;}
    .box{
      position: absolute;
      right: 200px;
      bottom:300px;
    }
</style>
