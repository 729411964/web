<style scoped lang="less">
    .index{
        width: 100%;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h1>
                    <img src="../images/logo.png">
                </h1>
                <h2>
                    <p>Welcome to your iView app!</p>
                    <Button type="ghost" @click="handleStart(data_wing,$event,'aaa')">Start iView</Button>
                </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data (){
          return{
              data_wing:"12",
              data_wing2:"23",
              wing:"2323"
          }
        },
        methods: {
            handleStart (data,event,str) {
                console.log(data,event,str);
                console.log(this);
                console.log(this.$route);
                console.log(this.$router);
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
                console.log(this.util);

                this.$axios({
                    url: '/sssss',
                    data: {
                        firstName: 'Fred',
                        aaa:JSON.stringify({a:1,b:2})
                    }
                }).then(function (data) {
                    console.log("success",data);
                }).catch(function (error) {
                    console.log(error);
                })
            },
            method_wing (data,event,str){
                console.log(data,event,str);
            },
            method_wing2 (){

            }
        }
    }
</script>
