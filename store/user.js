//保存数据的属性
// export const state={
//     //用户信息
//     userInfo:{
//         token:'',
//         user:{
//             nickname:'',
//         }
        
//     }
// }
export const state=()=>{
    return{
        //用户信息
    userInfo:{
        token:'',
        user:{      
            
        }
    }
    }
}

//同步修改数据mutations
export const mutations={
    //state就是上面的state，这个参数是固定默认的
    //data使用调用该方法的时候传入的数据
    setUserInfo(state,data){
        console.log(data)
        state.userInfo=data;
    
    },
    //清除用户数据
    cleanUserInfo(state,info){
        // console.log(state)
        if(process.browser){
        // console.log(process.browser)

            localStorage.removeItem("userInfo")
        }
        state.userInfo={};
    }

}
//异步修改数据
export const actions={
    //登陆
   

}