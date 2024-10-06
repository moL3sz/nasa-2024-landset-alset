import {Card} from "primereact/card";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";


const Register = () => {


    const navigate = useNavigate();

    return <>
        <div className={"h-[100vh] bg-gray-800 flex flex-col items-center"}>
            <div className={"via-purple-500 to-gray-800 h-[60vh] bg-no-repeat  w-full"}
                 style={{backgroundImage: "url(https://e3.365dm.com/23/03/1600x900/skynews-algae-bloom-satellite_6075001.jpg?20230302110642)",
                        backgroundSize:"cover",
                     backgroundPosition:"center"
                 }}>
            </div>
            <Card
                className={"h-auto w-[30%] border-[1px] border-gray-700 shadow-xl translate-y-[-100px] flex flex-col items-center"}>
                <div className={"flex flex-col items-center gap-6"}>
                    <i className={"pi pi-user-plus"} style={{fontSize: 32}}/>
                    <div>Sign Up</div>
                    <IconField iconPosition="left">
                        <InputIcon className={"pi pi-user"}/>
                        <InputText placeholder={"Enter username"}/>
                    </IconField>

                    <IconField iconPosition="left">
                        <InputIcon className={"pi pi-at"}/>
                        <InputText type={"password"} placeholder={"Enter email"}/>
                    </IconField>

                    <IconField iconPosition="left">
                        <InputIcon className={"pi pi-lock"}/>
                        <InputText type={"password"} placeholder={"Enter password"}/>
                    </IconField>

                    <IconField iconPosition="left">
                        <InputIcon className={"pi pi-lock"}/>
                        <InputText type={"password"} placeholder={"Confirm password"}/>
                    </IconField>
                    <Button label={"Sign up"} severity={"help"} icon={"pi pi-plus"} className={"w-full"} size={"small"}/>
                    <Button label={"Already have an account? Sign in here."} severity={"warning"} text className={"w-full"} size={"small"} onClick={()=>navigate("/signin")}/>
                </div>

            </Card>
            <div className={"pb-2 flex flex-col items-center"}>
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

export default Register;