import {OverlayPanel} from "primereact/overlaypanel";
import {forwardRef, useRef, useState} from "react";
import {InputSwitch} from "primereact/inputswitch";
import {BASE_API_URL} from "../../config/globals.ts";


export const Notifications =
    forwardRef<OverlayPanel, any>((props, ref) =>{


    const [sms, setSMS] = useState<boolean>(false);
    const [webpush, setWebpush] = useState<boolean>(false);
    const [email, setEmail] = useState<boolean>(false);

    console.log(props)


    const updateNotificType = async (type:string, value:boolean) =>{
        let updateData = {
            ...props.targetData,
        }


        if (value){
            if (!updateData.sendMode.includes(type)){
                console.log("Ez fut le")
                updateData.sendMode = [...updateData.sendMode, type]
            }
        }
        else{
            updateData.sendMode = updateData.sendMode.filter((x:string)=>x!== type);
        }
        console.log(updateData)
        try{
            const response = await fetch(BASE_API_URL + "/targets", {
                headers:{
                  "Content-Type" : "application/json"
                },
                method:"PUT",
                body:JSON.stringify(updateData)
            });
            const data = await response.json();
            props.setTargetData(data);
        }
        catch (e){

        }
    }
        const smsChecked = props.targetData?.sendMode?.filter((x:string)=>x === "sms")?.length !== 0;
        const webpushChecked = props.targetData?.sendMode?.filter((x:string)=>x === "webpush")?.length !== 0;
        const emailChecked = props.targetData?.sendMode?.filter((x:string)=>x === "email")?.length !== 0;

        return <OverlayPanel ref={ref}>
        <div className={"flex flex-col gap-4"}>
            <div>Enabled notification types</div>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex items-center justify-between"}>
                    <div>
                        <i className={"pi pi-mobile me-2"}/><span>SMS</span>
                    </div>

                    <InputSwitch  checked={smsChecked}  onChange={({value})=>{
                       updateNotificType("sms", value);
                    }}/>
                </div>
                <div className={"flex items-center justify-between"} >
                    <div>
                        <i className={"pi pi-arrow-circle-up me-2"}/><span>WebPush</span>
                    </div>

                    <InputSwitch checked={webpushChecked} onChange={({value})=>{
                        updateNotificType("webpush", value);
                    }}/>
                </div>
                <div className={"flex items-center justify-between"}>
                    <div>
                        <i className={"pi pi-at me-2"}/><span>Email</span>
                    </div>

                    <InputSwitch checked={emailChecked} onChange={({value})=>{
                        updateNotificType("email", value);
                    }}/>
                </div>
            </div>
        </div>


    </OverlayPanel>

});