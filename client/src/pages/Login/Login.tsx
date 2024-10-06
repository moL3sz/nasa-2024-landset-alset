import {Card} from "primereact/card";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";


const Login = () =>{


    const navigate = useNavigate();


    return <>
        <div className={"h-[100vh] bg-gray-800 flex flex-col items-center"}>
            <div className={"via-purple-500 to-gray-800 h-[50vh] w-full"} style={{backgroundImage:"url(https://cdn.mos.cms.futurecdn.net/WNvx5JXBoi9LZmWbZKVYRf.jpg)"}}>

            </div>
            <Card className={"h-auto w-[30%] border-[1px] border-gray-700 shadow-xl translate-y-[-200px] flex flex-col items-center"}>
                <div className={"flex flex-col items-center gap-6"}>
                    <i className={"pi pi-user"} style={{fontSize:32}}/>
                    <div>Authentication</div>
                    <IconField iconPosition="left">
                        <InputIcon className={"pi pi-user"}/>
                        <InputText placeholder={"Enter username"}/>
                    </IconField>
                    <IconField iconPosition="left">
                        <InputIcon className={"pi pi-lock"}/>
                        <InputText type={"password"} placeholder={"Enter password"}/>
                    </IconField>
                    <Button label={"Sign in"} icon={"pi pi-sign-in"} className={"w-full"} size={"small"} onClick={()=>navigate("/")}/>
                    <Button label={"Don't have an account? Sign up now!"} severity={"help"} size={"small"} text onClick={()=>navigate("/signup")}/>
                </div>

            </Card>
            <div className={"flex flex-col items-center p-2"}>
                <img
                    className={"rounded-full shadow-2xl"}
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2AU7HrCZiGamsHv-C4M_zGYO6UBCkuR74zE4NqeF5ENLIP4pcPNSmyGCbz4yibH9R1EY&usqp=CAU"}
                    width={48} height={48}/>
                <div className={"font-bold text-white"}>Landsat Land Tracker by ALSET</div>
                <div>&#169; All rights reserved</div>
            </div>

        </div>
    </>

}



export default Login;