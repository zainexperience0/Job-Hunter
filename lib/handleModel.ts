export const handleModel = (select:any, model:any, act:any) => {
    let defaultSelect = {...select}
    if(model === "user"){
        if(act==="getRole"){
            let roleSelect:any = {}
            roleSelect["role"] = true
            return {...roleSelect}
        }if(act==="getMeta"){
            let roleSelect:any = {}
            roleSelect["username"] = true
            roleSelect["email"] = true
            roleSelect["image"] = true
            roleSelect["role"] = true
            return {...roleSelect}
        }else{
            defaultSelect["password"] = false
            return defaultSelect
        }
    } else if(model === "workingOnJobs"){

        if(defaultSelect?.user){
            defaultSelect["user"] = {
                select: {
                    username: true,
                    email: true,
                    image:true,

                }
            }
            return defaultSelect
        }
        return defaultSelect
    }else{
        return defaultSelect
    }
}