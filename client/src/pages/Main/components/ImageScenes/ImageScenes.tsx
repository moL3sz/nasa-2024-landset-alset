import {Badge} from "primereact/badge";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import {toggleVisible} from "../../../../store/imageScenes/imageScenes.slice.ts";
import {Sidebar} from "primereact/sidebar";
import {useState} from "react";
import {Button} from "primereact/button";
import {Chart} from 'primereact/chart';

const testData = [
    {
        code: "Test1",
        name: "Test1 name",
        category: "Cat1",
        quantity: "Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code: "Test1",
        name: "Test1 name",
        category: "Cat1",
        quantity: "Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code: "Test1",
        name: "Test1 name",
        category: "Cat1",
        quantity: "Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153342/mttaranaki_oli_20230610.jpg"
    },
    {
        code: "Test1",
        name: "Test1 name",
        category: "Cat1",
        quantity: "Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code: "Test1",
        name: "Test1 name",
        category: "Cat1",
        quantity: "Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code: "Test1",
        name: "Test1 name",
        category: "Cat1",
        quantity: "Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153408/typhoonkrathon_vir2_20240930.jpg"
    },
    {
        code: "Test1",
        name: "Test1 name",
        category: "Cat1",
        quantity: "Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code: "Test1",
        name: "Test1 name",
        category: "Cat1",
        quantity: "Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153408/typhoonkrathon_vir2_20240930.jpg"
    }
]
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
    return <img src={rowData.src} alt={"Landsat 9"} width="64px" className="shadow-xl rounded"/>;
};
export const ImageScenes = () => {

    const [dialogVisible, setDialogVisible] = useState<boolean>(false);

    const visible = useAppSelector(state => state.imageScenes.visible);
    const dispatch = useAppDispatch();


    return <Sidebar onHide={() => dispatch(toggleVisible())} position={"right"}  visible={visible}
                    className={"fixed bottom-0 h-auto w-full mx-auto z-0 shadow-2xl"}>
        <div>

            {
                dialogVisible ? <div>
                        <Button icon={"pi pi-arrow-left"} size={"small"} text onClick={() => setDialogVisible(false)}/>

                        <div className={"flex gap-2 items-end"}>
                            <img
                                width={296}
                                src={"https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153408/typhoonkrathon_vir2_20240930.jpg"}
                                className={"rounded-2xl shadow-md"}/>
                            <Chart width={"800px"} type="bar" data={chartData} options={{}}/>
                        </div>

                    </div> :
                    <div>


                        <div className={"w-full flex items-center justify-between"}>
                            <div>
                                <i className={"pi pi-images"}/>
                                <span className={"text-white ms-2"}>Image scenes</span>
                                <Badge value={`${testData.length} images for Budapest`} className={"ms-2 px-1"}/>
                            </div>
                        </div>
                        <DataTable
                            size={"small"}
                            className={"mt-2"}
                            value={testData}
                            showGridlines={true}
                            paginator={true}
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                        >
                            <Column body={(data) => <Button icon={"pi pi-eye"} text onClick={(e) => {
                                setDialogVisible(true)
                            }}/>} headerStyle={{width: 50}}>

                            </Column>
                            <Column field={"src"} header={"Preview"} headerStyle={{width: 50}}
                                    body={imageBodyTemplate}/>
                            <Column field="code" header="Code"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                        </DataTable>
                    </div>}

        </div>
    </Sidebar>
}