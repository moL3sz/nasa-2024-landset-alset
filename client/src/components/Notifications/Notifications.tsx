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
            <div>Enabled notification types</div>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex items-center justify-between"}>
                    <div>
                        <i className={"pi pi-mobile me-2"}/><span>SMS</span>
                    </div>

                    <InputSwitch  checked={sms}  onChange={({value})=>{
                       setSMS(value);
                    }}/>
                </div>
                <div className={"flex items-center justify-between"} >
                    <div>
                        <i className={"pi pi-arrow-circle-up me-2"}/><span>WebPush</span>
                    </div>

                    <InputSwitch checked={webpush} onChange={({value})=>setWebpush(value)}/>
                </div>
                <div className={"flex items-center justify-between"}>
                    <div>
                        <i className={"pi pi-at me-2"}/><span>Email</span>
                    </div>

                    <InputSwitch checked={email} onChange={({value})=>setEmail(value)}/>
                </div>

            </div>
        </div>


    </OverlayPanel>

});