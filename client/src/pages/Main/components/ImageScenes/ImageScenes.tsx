import {Badge} from "primereact/badge";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import {toggleVisible} from "../../../../store/imageScenes/imageScenes.slice.ts";
import {Sidebar} from "primereact/sidebar";
import {useCallback, useEffect, useState} from "react";
import {Button} from "primereact/button";
import {Chart} from 'primereact/chart';
import {BASE_API_URL} from "../../../../config/globals.ts";


const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

const imageBodyTemplate = (rowData: any) => {
    return <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WNyqmEY2CzM0j2-5XbzPPFhdDtiLlHR6zw&s"} alt={"Landsat 9"} width="64px" className="shadow-xl rounded"/>;
};

const startBodyTemplate = (rowData:any) =>{
    return new Date(rowData.startTime).toLocaleString();
}

const stopBodyTemplate = (rowData:any) =>{
    return new Date(rowData.stopTime).toLocaleString();
}

export const ImageScenes = () => {

    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [sceneMetadata, setSceneMetaData] = useState<any[]>([]);
    const [detailed, setDetailed] = useState<any>(null);

    console.log(detailed)

    const visible = useAppSelector(state => state.imageScenes.visible);
    const dispatch = useAppDispatch();

    const getSceneMetadata = useCallback(async ()=>{
        try{
            const response = await fetch(BASE_API_URL + "/scene-metadata/1");
            const data = await response.json();
            setSceneMetaData(data);
        }
        catch (e){

        }
    },[]);
    useEffect(()=>{
        getSceneMetadata();
    },[]);

    const chartData2 = {
        labels:Array.from({length:16}).map((_, i)=>i+1),
        datasets: Object.entries(detailed?.histogram || {}).slice(0,5)?.map((entry)=>{
            return {
                label:entry[0],
                data:entry[1]
            }
        })
    }


    return <Sidebar onHide={() => dispatch(toggleVisible())} position={"right"}  visible={visible}
                    className={"fixed bottom-0 h-auto w-full mx-auto z-0 shadow-2xl"}>
        <div>

            {
                dialogVisible && detailed ? <div>
                    <div className={"flex items-center gap-2"}>
                        <Button icon={"pi pi-arrow-left"} size={"small"} text onClick={() => setDialogVisible(false)}/>
                        <div>{detailed?.sceneId}</div>
                    </div>

                        <div className={"flex gap-2 items-end"}>
                            <img
                                height={"100%"}
                                src={"https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153408/typhoonkrathon_vir2_20240930.jpg"}
                                className={"rounded-2xl shadow-md"}/>
                            <Chart width={"50%"} type="bar" data={chartData2} options={{}}/>
                        </div>

                    </div> :
                    <div>


                        <div className={"w-full flex items-center justify-between"}>
                            <div>
                                <i className={"pi pi-images"}/>
                                <span className={"text-white ms-2"}>Image scenes</span>
                                <Badge value={`${sceneMetadata.length} images for Budapest`} className={"ms-2 px-1"}/>
                            </div>
                        </div>
                        <DataTable
                            size={"small"}
                            className={"mt-2"}
                            value={sceneMetadata}
                            showGridlines={true}
                            paginator={true}
                            rows={5}
                            filterDisplay="row"
                            sortMode="multiple"
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            globalFilterFields={['sceneId', 'startTime', 'stopTime', 'cloudCover']}
                        >
                            <Column body={(data:any) => <Button icon={"pi pi-eye"} text onClick={(e) => {
                                setDialogVisible(true);
                                setDetailed(data);
                            }}/>} headerStyle={{width: 50}}>

                            </Column>
                            <Column
                                field={"src"}
                                header={"Preview"}
                                headerStyle={{width: 50}}
                                body={imageBodyTemplate}/>
                            <Column
                                sortable
                                filter
                                field="sceneId"
                                header="Scene identifier"
                                alignHeader={"center"}
                                align={"center"}
                            ></Column>
                            <Column
                                sortable
                                filter
                                field="startTime"
                                dataType={"date"}
                                header="Start"
                                alignHeader={"center"}
                                align={"center"}
                                body={startBodyTemplate}
                            ></Column>
                            <Column
                                sortable
                                filter
                                field="stopTime"
                                dataType={"date"}
                                header="Stop"
                                alignHeader={"center"}
                                align={"center"}
                                body={stopBodyTemplate}
                            ></Column>
                            <Column
                                sortable
                                filter
                                field="cloudCover"
                                header="Cloud cover"
                                alignHeader={"center"}
                                align={"center"}
                                dataType={"numeric"}
                            ></Column>
                        </DataTable>
                    </div>}

        </div>
    </Sidebar>
}