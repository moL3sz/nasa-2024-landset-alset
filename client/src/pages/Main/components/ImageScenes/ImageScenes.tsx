import {Card} from "primereact/card";
import {Badge} from "primereact/badge";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import {toggleVisible} from "../../../../store/imageScenes/imageScenes.slice.ts";
import {Sidebar} from "primereact/sidebar";

const testData = [
    {
        code:"Test1",
        name:"Test1 name",
        category:"Cat1",
        quantity:"Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code:"Test1",
        name:"Test1 name",
        category:"Cat1",
        quantity:"Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code:"Test1",
        name:"Test1 name",
        category:"Cat1",
        quantity:"Quantity",
        src:"https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153342/mttaranaki_oli_20230610.jpg"
    },
    {
        code:"Test1",
        name:"Test1 name",
        category:"Cat1",
        quantity:"Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code:"Test1",
        name:"Test1 name",
        category:"Cat1",
        quantity:"Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code:"Test1",
        name:"Test1 name",
        category:"Cat1",
        quantity:"Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153408/typhoonkrathon_vir2_20240930.jpg"
    },
    {
        code:"Test1",
        name:"Test1 name",
        category:"Cat1",
        quantity:"Quantity",
        src: "https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153416/ashevillefloods_oli_20240830.jpg"
    },
    {
        code:"Test1",
        name:"Test1 name",
        category:"Cat1",
        quantity:"Quantity",
        src:"https://eoimages.gsfc.nasa.gov/images/imagerecords/153000/153408/typhoonkrathon_vir2_20240930.jpg"
    }
]


const imageBodyTemplate = (rowData:any) => {
    return <img src={rowData.src} alt={"Landsat 9"} width="64px" className="shadow-xl rounded" />;
};
export const ImageScenes = () =>{



    const visible = useAppSelector(state=>state.imageScenes.visible);
    const dispatch = useAppDispatch();



    return  <Sidebar onHide={()=>dispatch(toggleVisible())} position={"bottom"} visible={visible} className={"fixed bottom-0 h-auto w-full mx-auto bg-gray-800 bg-opacity-80 shadow-2xl"}>
        <div>
            <div className={"w-full flex items-center justify-between"}>
                <div>
                    <i className={"pi pi-images"}/>
                    <span className={"text-white ms-2"}>Image scenes</span>
                    <Badge value={`${testData.length} images for Budapest`} className={"ms-2 px-1"} />
                </div>
            </div>

            <DataTable
                className={"mt-2"}
                value={testData}
                showGridlines={true}
                paginator={true}
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
            >
                <Column field={"src"} header={"Preview"} headerStyle={{width:50}} body={imageBodyTemplate}/>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>

        </div>

    </Sidebar>
}