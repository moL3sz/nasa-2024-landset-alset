import {OverlayPanel} from "primereact/overlaypanel";
import {forwardRef, useRef, useState} from "react";
import {InputSwitch} from "primereact/inputswitch";


export const Notifications =
    forwardRef<OverlayPanel, any>((props, ref) =>{


    const [sms, setSMS] = useState<boolean>(false);
    const [webpush, setWebpush] = useState<boolean>(false);
    const [email, setEmail] = useState<boolean>(false);



    return <OverlayPanel  ref={ref}>
        <div className={"flex flex-col gap-4"}>
            <div>Enable notification types</div>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex items-center justify-between"}>
                    <div>SMS</div>
                    <InputSwitch  checked={sms}  onChange={({value})=>{
                       setSMS(value);
                    }}/>
                </div>
                <div className={"flex items-center justify-between"} >
                    <div>WebPush</div>
                    <InputSwitch checked={webpush} onChange={({value})=>setWebpush(value)}/>
                </div>
                <div className={"flex items-center justify-between"}>
                    <div>Email</div>
                    <InputSwitch checked={email} onChange={({value})=>setEmail(value)}/>
                </div>

            </div>
        </div>


    </OverlayPanel>

});